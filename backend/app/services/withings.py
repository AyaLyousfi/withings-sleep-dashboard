import os
import httpx
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("WITHINGS_CLIENT_ID")
CLIENT_SECRET = os.getenv("WITHINGS_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI", "http://localhost:8000/auth/callback")

AUTH_URL = "https://account.withings.com/oauth2_user/authorize2"
TOKEN_URL = "https://wbsapi.withings.com/v2/oauth2"
SLEEP_URL = "https://wbsapi.withings.com/v2/sleep"

SCOPES = "user.info,user.metrics,user.activity,user.sleepevents"


def get_auth_url(state: str = "sleepiq") -> str:
    params = (
        f"response_type=code"
        f"&client_id={CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope={SCOPES}"
        f"&state={state}"
    )
    return f"{AUTH_URL}?{params}"


async def exchange_code(code: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.post(TOKEN_URL, data={
            "action": "requesttoken",
            "grant_type": "authorization_code",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code,
            "redirect_uri": REDIRECT_URI,
        })
        return response.json()


async def refresh_token(refresh_tok: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.post(TOKEN_URL, data={
            "action": "requesttoken",
            "grant_type": "refresh_token",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "refresh_token": refresh_tok,
        })
        return response.json()


async def get_sleep_summary(access_token: str, startdate: int, enddate: int) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.post(SLEEP_URL, data={
            "action": "getsummary",
            "startdateymd": startdate,
            "enddateymd": enddate,
        }, headers={"Authorization": f"Bearer {access_token}"})
        return response.json()
