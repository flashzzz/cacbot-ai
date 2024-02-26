from flask import jsonify, request
from src.decorator.decorator import token_required
from src.database.database import db
from src.helpers.parse_json import parse_json


@token_required
def get_user_profile(name: str): #name is username sending from the frontend
    username = name 
    user_info = db.users.find_one({"username": username})
    
    if user_info:
        return jsonify({"data": parse_json(user_info), "message": "User fetched successfully"}), 200
    return jsonify({"message": "User not found"}), 404


@token_required
def update_user_profile(name: str): 
    username = name
    data = request.get_json()
    data_to_update = {
        "Status": data["Status"],
    }
    user_info = db.users.find_one({ "$or": [
            { "username": username },
        ]
    })
    if user_info:
        db.users.find_one_and_update({ "$or": [
            { "username": username },
        ]
            }, {"$set": {**user_info , **data_to_update}})
        return jsonify({"message": "User updated successfully"}), 200
    return jsonify({"message": "User not found"}), 404
