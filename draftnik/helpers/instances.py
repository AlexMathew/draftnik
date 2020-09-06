import os

from .redis import Redis
from .s3 import S3

redis = Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"))
s3 = S3()
