
from flask import Flask, Blueprint, request

auth_bp = Blueprint('auth', __name__)

@auth_bp.post('/auth/login')
def get_data(): 
    data = request.get_json()
    print("data" , data)
    return {"token": "token", "message": "Login Successfully"}