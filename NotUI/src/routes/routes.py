from flask import Blueprint

document_bp = Blueprint('main', __name__)

@document_bp.get('/main')
def get_data(): 
    # data = request.form.get('fruit')
    return 'Hello, World!'



