
from flask import Flask, Blueprint, request, jsonify, session
import jwt

auth_bp = Blueprint('auth', __name__)

@auth_bp.post('/auth/login')
def login(): 
    data = request.get_json()
    # if data:
    token = jwt.encode(data, "7fe6e94b-26c7-4320-8e56-fea6254c9fa9", algorithm="HS256")
    return jsonify({"access_token": token, "message": "Login Successfully"})