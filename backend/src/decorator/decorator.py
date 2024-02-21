from flask import request, jsonify
from functools import wraps
import jwt

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
            return jsonify({'error': 'Token missing'}) , 401

        decoded_token = verify_token(token)

        if not decoded_token:
            return jsonify({'error': 'Invalid token'}) , 404

        if decoded_token['username'] == 'admin':
            # You can also pass the decoded token to the route function if needed
            return f(*args, **kwargs)
        else:
            return jsonify({'error': 'Unauthorized'}), 401

    return decorated_function