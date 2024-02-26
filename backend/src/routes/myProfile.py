from flask import jsonify, request
from src.decorator.decorator import token_required
from src.database.database import db
from src.helpers.parse_json import parse_json


# @myProfile_bp.get('/myProfile/<name>')
@token_required
def get_user_profile(name: str):
    username = name 
    user_info = db.users.find_one({"username": username})
    if user_info:
        return jsonify({"data": parse_json(user_info), "message": "User fetched successfully"}), 200

    return jsonify({"message": "User not found"}), 404
