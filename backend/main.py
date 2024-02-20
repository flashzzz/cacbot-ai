# some cool async fastapi/sanic code
from flask import Flask
from src.api.index import app
from src.constants.dir_paths import Directory
from src.handlers.handlers import DocumentHandler
from flask_pymongo import PyMongo


if __name__ == '__main__':
    app.config["MONGO_URI"] = "mongodb://localhost:27017/CACBOT"
    mongo = PyMongo(app).db
    # mongo.users.insert_one({'username': "abhisek", 'password': 'user' })
    app.run(host='0.0.0.0', port=80, debug=True, use_reloader=True)

# obj = DocumentHandler('userx').doc_handler([('./main2.txt', 'txt')])
# obj2 = DocumentHandler('userx')
# res = obj2.chat_handler('who is jon snow')
# print(res)