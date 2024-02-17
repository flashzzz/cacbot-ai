
from flask import Flask, request, jsonify
from flask_cors import CORS
from src.routes.routes import document_bp
from src.routes.auth import auth_bp
import jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = "7fe6e94b-26c7-4320-8e56-fea6254c9fa9"
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    
app.register_blueprint(document_bp)
app.register_blueprint(auth_bp)
