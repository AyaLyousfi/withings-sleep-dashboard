from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging

logging.basicConfig(level=logging.INFO)
load_dotenv()

from .database import engine, Base
from .routers import auth, sleep

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SleepIQ API", version="0.1.0")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(sleep.router)


@app.get("/")
def root():
    return {"status": "SleepIQ API running"}
