# some cool async fastapi/sanic code
# from flask import Flask
# from src.api.index import app
# from src.constants.uploads_dir import UploadsDir

# app.config['UPLOAD_FOLDER'] = UploadsDir.UPLOADS_DIR.value

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=80, debug=True, use_reloader=True)
from src.handlers.handlers import DocumentHandler
obj = DocumentHandler('userx', [('main.txt', 'txt')])
flag = obj.doc_handler()
if flag:
    res = obj.chat_handler('who is king in the north, tell me in a poetic way')
    print(res)
# from langchain_core.documents.base import Document
# from src.utils.vectorstore_utils import embed_docs
# print(embed_docs([Document(page_content='hello i am cool guy')]))