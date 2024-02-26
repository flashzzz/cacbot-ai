import hashlib

def hashlib_password(password: str) -> str:
    return hashlib.md5(password.encode()).hexdigest()