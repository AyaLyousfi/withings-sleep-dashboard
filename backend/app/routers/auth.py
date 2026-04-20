import os
import time
import logging
from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse, JSONResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import OAuthToken
from ..services.withings import get_auth_url, exchange_code

router = APIRouter(prefix="/auth", tags=["auth"])

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
logger = logging.getLogger(__name__)


@router.get("/login")
def login():
    """Redirect user to Withings OAuth2 authorization page."""
    return RedirectResponse(url=get_auth_url())


@router.get("/callback")
async def callback(code: str, state: str = "", db: Session = Depends(get_db)):
    """Handle OAuth2 callback: exchange code for token and store it."""
    try:
        result = await exchange_code(code)
    except Exception as exc:
        logger.error("Token exchange failed: %s", exc)
        return RedirectResponse(url=f"{FRONTEND_URL}/dashboard?auth=error")

    logger.info("Withings token response status: %s", result.get("status"))

    if result.get("status") != 0:
        logger.error("Withings returned error: %s", result)
        return RedirectResponse(url=f"{FRONTEND_URL}/dashboard?auth=error")

    body = result.get("body", {})
    token = OAuthToken(
        access_token=body["access_token"],
        refresh_token=body["refresh_token"],
        expires_at=int(time.time()) + body.get("expires_in", 10800),
        user_id=str(body.get("userid", "")),
    )
    db.add(token)
    db.commit()
    logger.info("Token stored for user_id=%s", token.user_id)

    return RedirectResponse(url=f"{FRONTEND_URL}/dashboard")


@router.get("/logout")
def logout(db: Session = Depends(get_db)):
    """Clear all stored tokens."""
    db.query(OAuthToken).delete()
    db.commit()
    return JSONResponse({"success": True})


@router.get("/status")
def status(db: Session = Depends(get_db)):
    """Check if a valid token exists."""
    token = db.query(OAuthToken).order_by(OAuthToken.id.desc()).first()
    if token and token.expires_at > int(time.time()):
        return {"connected": True}
    return {"connected": False}
