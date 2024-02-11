# some cool async fastapi/sanic code
from flask import Flask
from src.api.index import app
from src.constants.dir_paths import Directory
from src.handlers.handlers import DocumentHandler


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, use_reloader=True)

# # obj = DocumentHandler('userx').doc_handler([('main2.txt', 'txt')])
# obj2 = DocumentHandler('userx')
# res = obj2.chat_handler('who wrote naruto')
# print(res)