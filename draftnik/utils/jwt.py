from django.conf import settings
import jwt


def decode_payload(token):
    secret = settings.JWT_SECRET
    algorithm = settings.JWT_ALGORITHM
    return jwt.decode(token, secret, algorithms=[algorithm])


def encode_payload(
    payload=None, algorithm=settings.JWT_ALGORITHM, secret=settings.JWT_SECRET
):
    payload = payload if isinstance(payload, dict) else {}

    return jwt.encode(payload, secret, algorithm=algorithm)
