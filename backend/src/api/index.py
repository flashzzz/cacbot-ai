from flask import Flask
from flask_cors import CORS
from src.blueprints.blueprints import document_bp, myProfile_bp, auth_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = "7fe6e94b-26c7-4320-8e56-fea6254c9fa9"
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.register_blueprint(auth_bp)
app.register_blueprint(myProfile_bp)
app.register_blueprint(document_bp)

