from enum import Enum
import os

class Directory(Enum):
    UPLOADS_DIR = os.path.join("src", "uploads")
    DATA_MAP_DIR = os.path.join("src", "data_map.json")
    