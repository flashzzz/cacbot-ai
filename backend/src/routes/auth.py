import jwt
import os
from flask import request, jsonify
from src.database.database import db
from src.helpers.parse_json import parse_json
from src.helpers.hash_password import hashlib_password

def sign_up():
    data = request.get_json()
    user_exist = db.users.find_one({ "$or": [
            { "username": data["username"] },
            { "email": data["email"] }
        ]
    })
    if user_exist:
        return jsonify({"message": "User already used"}), 400
    
    data["password"] = hashlib_password(data["password"])
    data["confirmPassword"] = hashlib_password(data["confirmPassword"] + os.environ.get("SALT"))
    db.users.insert_one(data)
    return jsonify({"message": "User created successfully"}), 201

# login k time pe token generate karna hai
def login(): 
    data = request.get_json()
    user_exist = db.users.find_one({ "$or": [
            { "username": data["username"] },
            { "email": data["username"] }
        ], "password": hashlib_password(data["password"])
    })
    
    if user_exist:
        token = jwt.encode(data, "7fe6e94b-26c7-4320-8e56-fea6254c9fa9", algorithm="HS256")
        return jsonify({"access_token": token, 'user': parse_json(user_exist), "message": "Login Successfully"}), 200
    return jsonify({"message": "Invalid username or password"}), 401
