import os
import json
from shutil import rmtree
from flask import request, jsonify
from werkzeug.utils import secure_filename
from src.constants.dir_paths import Directory
from src.handlers.handlers import DocumentHandler
from src.decorator.decorator import token_required
from src.constants.doc_types import DocType

def delete(path: str):
    rmtree(path)


@token_required
def post_data_file(): 
    success_flag = False
    target = Directory.UPLOADS_DIR.value
    if not os.path.exists(target):
        os.mkdir(target)

    for i, file in enumerate(request.files):
        print(file, request.files[file])
        curr_file = request.files[f'file-{i}']
        curr_filename = secure_filename(curr_file.filename)
        curr_file.save(os.path.join(target, curr_filename))
        success_flag = DocumentHandler('userx').doc_handler([(f'{os.path.join(target, curr_filename)}', 'txt')])
    
    data_str = request.form.get("links")
    data_str = data_str[1:-1]
    print('-------------------------------')
    print(data_str, type(data_str))
    links_data = json.loads(data_str)
    print('-------------------------------')

    all_docs_to_be_split = []
    for filee in os.listdir(target):
        filee_path = os.path.join(target, filee)
        filee_ext = filee.split('.')[-1]
        all_docs_to_be_split.append((filee_path, filee_ext))
    
    for url in links_data[0]['normal_links']:
        all_docs_to_be_split.append((url, DocType.WEB_URL.value))
    
    for web_pdf in links_data[1]['pdf_links']:
        all_docs_to_be_split.append((web_pdf, DocType.ONLINE_PDF.value))
        
            
    success_flag = DocumentHandler('userx').doc_handler(all_docs_to_be_split)
    rmtree(target)
    # TODO - proper logging and exception handling
    if success_flag:
        return jsonify({'message': 'File received and upserted successfully'})
    
    return jsonify({'message': 'File received but failed to upsert. Please try again later.'})


@token_required
def playground():
    data = request.get_json()
    handler = DocumentHandler('userx')
    response = handler.chat_handler(data)
    return response

