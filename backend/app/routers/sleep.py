import time
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import OAuthToken
from ..services.synthetic import generate_hotel_dataset
from ..services.withings import get_sleep_summary, refresh_token as refresh_withings_token

router = APIRouter(prefix="/api", tags=["sleep"])


@router.get("/demo-data")
def demo_data(rooms: int = 8, days: int = 30):
    """Return synthetic hotel sleep dataset — no auth required."""
    return generate_hotel_dataset(num_rooms=rooms, days=days)


@router.get("/sleep-data")
async def sleep_data(db: Session = Depends(get_db)):
    """Fetch real sleep data from Withings API (requires valid token)."""
    token = db.query(OAuthToken).order_by(OAuthToken.id.desc()).first()
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Refresh if expired
    if token.expires_at <= int(time.time()) + 60:
        result = await refresh_withings_token(token.refresh_token)
        if result.get("status") != 0:
            raise HTTPException(status_code=401, detail="Token refresh failed")
        body = result["body"]
        token.access_token = body["access_token"]
        token.refresh_token = body["refresh_token"]
        token.expires_at = int(time.time()) + body["expires_in"]
        db.commit()

    from datetime import datetime, timedelta
    enddate = datetime.now().date()
    startdate = enddate - timedelta(days=30)

    data = await get_sleep_summary(token.access_token, startdate.isoformat(), enddate.isoformat())
    return data
