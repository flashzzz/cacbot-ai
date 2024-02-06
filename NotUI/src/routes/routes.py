from flask import Blueprint, request

document_bp = Blueprint('main', __name__)

@document_bp.route('/main', methods=['POST'])
def get_data(): 
    # uploaded_file = request.form.get('file')
    if request.method == 'POST':
        content = request.form.get('username')
        # file_name = uploaded_file.filename
        print(content)
        return f'The file {content} has been uploaded successfully!'



