import jwt
from flask import request, jsonify
from src.database.database import db
from src.helpers.parse_json import parse_json


# login k time pe token generate karna hai
def login(): 
    data = request.get_json()
    #TODO - Add proper logging, Database connection and exception handling
    
    isValidUser = db.users.find_one({"username": data["username"], "password": data["password"]})
    if isValidUser:
        token = jwt.encode(data, "7fe6e94b-26c7-4320-8e56-fea6254c9fa9", algorithm="HS256")
        return jsonify({"access_token": token, 'user': parse_json(isValidUser), "message": "Login Successfully"}), 200
    return jsonify({"message": "Invalid username or password"}), 401
