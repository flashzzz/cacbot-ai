
from flask import Flask
from flask_cors import CORS
from src.api.index import document_bp

app = Flask(__name__)
app.register_blueprint(document_bp)
CORS(app)
