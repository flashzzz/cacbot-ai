
import jwt
from flask import Flask
from flask_cors import CORS
from src.routes.routes import document_bp
from src.blueprints.blueprints import auth_bp, myProfile_bp, document_bp
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['SECRET_KEY'] = "7fe6e94b-26c7-4320-8e56-fea6254c9fa9"
app.config["MONGO_URI"] = "mongodb://localhost:27017/CACBOT"
mongo = PyMongo(app).db
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    
app.register_blueprint(document_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(myProfile_bp)
