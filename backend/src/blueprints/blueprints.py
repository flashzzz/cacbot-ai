from flask import Blueprint
from flask_cors import CORS
from src.routes.myProfile import get_user_profile
from src.routes.routes import post_data_file, playground
from src.routes.auth import login

document_bp = Blueprint('main', __name__)
myProfile_bp = Blueprint("myProfile", __name__)
auth_bp = Blueprint('auth', __name__)

CORS(document_bp)
CORS(myProfile_bp)
CORS(auth_bp)

document_bp.add_url_rule(rule="/playground", view_func=playground, methods=["POST"])
document_bp.add_url_rule(rule="/main/uploads", view_func=post_data_file, methods=["POST"])
myProfile_bp.add_url_rule(rule="/myProfile/<name>", view_func=get_user_profile, methods=["GET"])
auth_bp.add_url_rule(rule="/auth/login", view_func=login, methods=["POST"])

