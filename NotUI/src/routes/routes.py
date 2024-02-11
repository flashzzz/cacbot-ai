from flask import Flask, render_template, request, Blueprint, jsonify
import os
from werkzeug.utils import secure_filename
from src.constants.uploads_dir import UploadsDir
from shutil import rmtree

document_bp = Blueprint('main', __name__)

def delete(path: str):
    rmtree(path)

@document_bp.post('/main/uploads')
def get_data(): 
    data = request.get_json()
    print("data" , data)
    return {'message': 'Data received successfully'}

@document_bp.post('/main/uploads/file')
def get_data_file(): 
    target = UploadsDir.UPLOADS_DIR.value
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



