from sqlalchemy import Column, Integer, String, Float, DateTime
from .database import Base
from datetime import datetime


class OAuthToken(Base):
    __tablename__ = "oauth_tokens"

    id = Column(Integer, primary_key=True, index=True)
    access_token = Column(String, nullable=False)
    refresh_token = Column(String, nullable=False)
    expires_at = Column(Integer, nullable=False)  # Unix timestamp
    user_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class SleepRecord(Base):
    __tablename__ = "sleep_records"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    room_id = Column(Integer, nullable=False)
    sleep_score = Column(Integer)
    total_duration_min = Column(Integer)
    deep_sleep_min = Column(Integer)
    rem_sleep_min = Column(Integer)
    light_sleep_min = Column(Integer)
    awake_min = Column(Integer)
    efficiency = Column(Float)
    heart_rate_avg = Column(Integer)
    snoring_episodes = Column(Integer)
    respiratory_rate = Column(Float)
    synced_at = Column(DateTime, default=datetime.utcnow)
