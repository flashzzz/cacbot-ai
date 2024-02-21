from flask import jsonify
from src.decorator.decorator import token_required
from src.blueprints.blueprints import myProfile_bp

users = [
    {
        "username": "admin",
        "password": "admin",
        "email": "abhisek@yahoo.in",
        "fullname": "Abhisek kumar Singh",
        "status": "Focusing"
    },
    {
        "username": "user",
        "password": "user",
        "email": "atul@hgyum.com",
        "fullname": "Atul kumar",
        "status": "Resting"
    }
]

# def verify_token(token: str):
#     try:
#         decoded = jwt.decode(token, "7fe6e94b-26c7-4320-8e56-fea6254c9fa9", algorithms=['HS256'])
#         # Further checks, such as expiration time
#         return decoded
#     except jwt.ExpiredSignatureError:
#         return None  # Token has expired
#     except jwt.InvalidTokenError:
#         return None  # Invalid token

# @myProfile.before_request
# def check_token():
#     token = request.headers.get('Auth-Token')

#     if not token:
#         return jsonify({'error': 'Token missing'})

#     decoded_token = verify_token(token)

#     if not decoded_token:
#         return jsonify({'error': 'Invalid token'})
    
#     if decoded_token['username'] == 'user':
#         pass
#     else:
#         return jsonify({'error': 'Unauthorized'}), 401



@myProfile_bp.get('/myProfile/<name>')
@token_required
def get_user_profile(name: str):
    username = name
    for user in users:
        if user["username"] == username:
            return jsonify({"data": user, "message": "User fetched successfully"}), 200
    
    return jsonify({"message": "User not found"}), 404
