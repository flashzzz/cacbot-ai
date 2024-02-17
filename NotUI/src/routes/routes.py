import os
from shutil import rmtree
from flask import Flask, abort, request, Blueprint, jsonify
from werkzeug.utils import secure_filename
from src.constants.dir_paths import Directory
from src.handlers.handlers import DocumentHandler
import jwt

document_bp = Blueprint('main', __name__)

# def verify_token(token: str):
#     try:
#         decoded = jwt.decode(token, "7fe6e94b-26c7-4320-8e56-fea6254c9fa9", algorithms=['HS256'])
#         # Further checks, such as expiration time
#         return decoded
#     except jwt.ExpiredSignatureError:
#         return None  # Token has expired
#     except jwt.InvalidTokenError:
#         return None  # Invalid token

# @document_bp.before_request
# async def check_token():
#     token = await request.headers.get('Auth-Token')
#     print("header",  token)

#     if not token:
#         return jsonify({'error': 'Token missing'}), 400

#     decoded_token = verify_token(token)

#     if not decoded_token:
#         return jsonify({'error': 'Invalid token'}), 401
    
#     return decoded_token

def delete(path: str):
    rmtree(path)

@document_bp.post('/main/uploads')
def get_data(): 
    data = request.get_json()
    return jsonify({'message': 'Links uploaded successfully'})


@document_bp.post('/main/uploads/file')
def get_data_file(): 
    success_flag = False
    target = Directory.UPLOADS_DIR.value
    if not os.path.exists(target):
        os.mkdir(target)

    # for file in request.files:
    #     print(file, request.files[file])
    uploaded_file = request.files['file-0'] # all the pdf which is uploaded
    filename = secure_filename(uploaded_file.filename)
    destination=os.path.join(target, filename)
    uploaded_file.save(destination)
    success_flag = DocumentHandler('userx').doc_handler([(f'{destination}', 'txt')])
    rmtree(target)
    # TODO - proper logging and exception handling
    if success_flag:
        return jsonify({'message': 'File received and upserted successfully'})
    
    return jsonify({'message': 'File received but failed to upsert. Please try again later.'})


@document_bp.post('/playground')
def playground():
    data = request.get_json()
    handler = DocumentHandler('userx')
    response = handler.chat_handler(data)
    return response
    # abort(400, description='Missing required key in the request JSON')

