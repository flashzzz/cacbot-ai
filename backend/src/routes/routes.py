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
# @token_required
def get_data(): 
    data = request.get_json()
    print(type(data), data)
    return jsonify({'message': 'Links uploaded successfully'})


@document_bp.post('/main/uploads/file')
# @token_required
def get_data_file(): 
    success_flag = False
    target = Directory.UPLOADS_DIR.value
    if not os.path.exists(target):
        os.mkdir(target)

    for i, file in enumerate(request.files):
        print(file, request.files[file])
        curr_file = request.files[f'file-{i}']
        curr_filename = secure_filename(curr_file.filename)
        curr_file.save(os.path.join(target, curr_filename))
        
    # success_flag = DocumentHandler('userx').doc_handler([(f'{destination}', 'txt')])
    # rmtree(target)
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

