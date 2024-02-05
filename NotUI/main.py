# some cool async fastapi/sanic code
from flask import Flask
from NotUI.src.api.index import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, use_reloader=False)