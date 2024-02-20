from flask import Flask, Blueprint, request, jsonify, session
import jwt

myProfile = Blueprint('myProfile', __name__)

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

@myProfile.get('/myProfile/<name>')
def get_user_profile(name: str):
    username = name
    for user in users:
        if user["username"] == username:
            return jsonify({'data': user, 'message': 'User profile fetched successfully'}) , 200
    else:
        return jsonify({'message': 'User profile failed successfully'}) , 200
