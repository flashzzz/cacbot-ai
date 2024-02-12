import os
from shutil import rmtree
from flask import Flask, abort, request, Blueprint, jsonify
from werkzeug.utils import secure_filename
from src.constants.dir_paths import Directory
from src.handlers.handlers import DocumentHandler

document_bp = Blueprint('main', __name__)

def delete(path: str):
    rmtree(path)

@document_bp.post('/main/uploads')
def get_data(): 
    data = request.get_json()
    print("data" , data)
    return data

@document_bp.post('/main/uploads/file')
def get_data_file(): 
    target = Directory.UPLOADS_DIR.value
    if not os.path.exists(target):
        os.mkdir(target)

    # for file in request.files:
    #     print(file, request.files[file])
    uploaded_file = request.files['file-0'] # all the pdf which is uploaded
    filename = secure_filename(uploaded_file.filename)
    destination="/".join([target, filename])
    uploaded_file.save(destination)
    # TODO - pus the file in the vector store 

    print("uploaded_file", uploaded_file)
    rmtree(target)
    return {'message': 'File received successfully'}


@document_bp.post('/playground')
def playground():
    data = request.get_json()
    handler = DocumentHandler('userx')
    response = handler.chat_handler(data)
    # return Exception("error")
    # response = jsonify({'error': str("Missing required key in the request JSON")})
    # response.status_code = 400
    return response
    # abort(400, description='Missing required key in the request JSON')

