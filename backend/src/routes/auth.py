
from flask import Flask, Blueprint, request, jsonify, session
import jwt



auth_bp = Blueprint('auth', __name__)

users = [
    {
        "username": "admin",
        "password": "admin"
    },
    {
        "username": "user",
        "password": "user"
    }
]

@auth_bp.post('/auth/login')
def login(): 
    data = request.get_json()
    # print(data)
    #TODO - Add proper logging, Database connection and exception handling
    for user in users:
        if user["username"] == data["username"] and user["password"] == data["password"]:
            token = jwt.encode(data, "7fe6e94b-26c7-4320-8e56-fea6254c9fa9", algorithm="HS256")
            return jsonify({"access_token": token, 'user': user, "message": "Login Successfully"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401
    # if data: