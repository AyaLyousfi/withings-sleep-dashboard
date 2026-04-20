import random
import math
from datetime import datetime, timedelta


def generate_sleep_night(date, room_id: int, base_score: int = 78):
    """Generate one night of realistic sleep data."""
    noise = random.gauss(0, 8)
    score = max(40, min(100, base_score + noise))

    total_minutes = int(random.gauss(420, 45))
    total_minutes = max(240, min(540, total_minutes))

    deep_pct = random.uniform(0.15, 0.25)
    rem_pct = random.uniform(0.18, 0.28)
    light_pct = random.uniform(0.40, 0.55)
    awake_pct = max(0.02, 1 - deep_pct - rem_pct - light_pct)

    return {
        "date": date.isoformat(),
        "room_id": room_id,
        "sleep_score": round(score),
        "total_duration_min": total_minutes,
        "deep_sleep_min": int(total_minutes * deep_pct),
        "rem_sleep_min": int(total_minutes * rem_pct),
        "light_sleep_min": int(total_minutes * light_pct),
        "awake_min": int(total_minutes * awake_pct),
        "efficiency": round(random.uniform(82, 96), 1),
        "heart_rate_avg": int(random.gauss(58, 6)),
        "snoring_episodes": random.randint(0, 12),
        "respiratory_rate": round(random.uniform(14, 18), 1),
    }


def generate_hotel_dataset(num_rooms: int = 8, days: int = 30):
    """Generate full hotel demo dataset."""
    rooms = []
    today = datetime.now().date()

    for room_num in range(1, num_rooms + 1):
        base_score = random.randint(65, 88)
        nights = []
        for d in range(days):
            date = today - timedelta(days=d)
            nights.append(generate_sleep_night(date, room_num, base_score))

        avg_score = sum(n["sleep_score"] for n in nights) / len(nights)
        recent_avg = sum(n["sleep_score"] for n in nights[:7]) / 7
        older_avg = sum(n["sleep_score"] for n in nights[7:14]) / 7
        trend = "up" if recent_avg > older_avg else "down"

        rooms.append({
            "room": f"{100 + room_num}",
            "floor": (room_num // 3) + 1,
            "avg_score": round(avg_score, 1),
            "trend": trend,
            "last_sync": nights[0]["date"],
            "nights": nights,
        })

    return rooms
