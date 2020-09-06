import os
import time
from urllib.parse import urljoin

from django.conf import settings
from selenium import webdriver

from draftnik.celery import app
from helpers.instances import s3
from utils.selenium import Driver


@app.task
def take_screenshot(shareable_url, preview_filename):
    url = urljoin(settings.SCREENSHOT_DASHBOARD_URL, shareable_url)
    with Driver() as driver:
        driver.get(url)
        driver.maximize_window()
        time.sleep(10)
        driver.save_screenshot(f"{preview_filename}.png")
        driver.save_screenshot(f"/tmp/{preview_filename}.png")

    upload_to_s3.delay(preview_filename)


@app.task
def upload_to_s3(preview_filename):
    image_location = f"/tmp/{preview_filename}.png"
    s3.upload_file(
        bucket_name=os.getenv("S3_BUCKET_NAME"),
        destination=f"{preview_filename}.png",
        source_file=image_location,
        content_type=f"image/png",
    )
