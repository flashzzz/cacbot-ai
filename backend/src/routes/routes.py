import os
from shutil import rmtree
from flask import Flask, abort, request, Blueprint, jsonify
from werkzeug.utils import secure_filename
from src.constants.dir_paths import Directory
from src.handlers.handlers import DocumentHandler
from src.decorator.decorator import token_required

document_bp = Blueprint('main', __name__)

def delete(path: str):
    rmtree(path)

@document_bp.post('/main/uploads')
@token_required
def get_data(): 
    data = request.get_json()
    return jsonify({'message': 'Links uploaded successfully'})


@document_bp.post('/main/uploads/file')
@token_required
def get_data_file(): 
    success_flag = False
    target = Directory.UPLOADS_DIR.value
    if not os.path.exists(target):
        os.mkdir(target)

    for file in request.files:
        print(file, request.files[file])
    uploaded_file = request.files['file-0'] # all the pdf which is uploaded
    uploaded_file_two = request.files['file-1'] # all the pdf which is uploaded
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
@token_required
def playground():
    data = request.get_json()
    handler = DocumentHandler('userx')
    response = handler.chat_handler(data)
    return response

