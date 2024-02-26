import jwt
from flask import request, jsonify
from functools import wraps
from src.database.database import db

def verify_token(token: str):
    try:
        decoded = jwt.decode(token, "7fe6e94b-26c7-4320-8e56-fea6254c9fa9", algorithms=['HS256'])
        # Further checks, such as expiration time
        return decoded
    except jwt.ExpiredSignatureError:
        return None  # Token has expired
    except jwt.InvalidTokenError:
        return None  # Invalid token

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Auth-Token')

        if not token:
            return jsonify({'message': 'Token missing'}) , 401

        decoded_token = verify_token(token)

        if not decoded_token:
            return jsonify({'message': 'Invalid token'}) , 404

        if db.users.find_one({ "$or": [
                { "username": decoded_token["username"] },
                { "email": decoded_token["username"] }
            ]
            }):
            return f(*args, **kwargs)
        else:
            return jsonify({'message': 'Unauthorized'}), 401

    return decorated_function