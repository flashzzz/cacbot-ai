
from flask import Flask
from flask_cors import CORS
from src.routes.routes import document_bp
from src.routes.auth import auth_bp

app = Flask(__name__)
app.register_blueprint(document_bp)
app.register_blueprint(auth_bp)
CORS(app, debug=True)
