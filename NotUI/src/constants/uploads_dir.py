from enum import Enum
import os

class UploadsDir(Enum):
    UPLOADS_DIR = os.path.join("src", "uploads")