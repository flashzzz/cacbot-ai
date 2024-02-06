# some cool async fastapi/sanic code
from flask import Flask
from src.api.index import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, use_reloader=True)
# from src.utils.vectorstore_utils import VectorStore
# from src.utils.doc_utils import load_and_split_doc
# v = VectorStore('user-id')
# # docs = load_and_split_doc([('/Users/atulverma/Desktop/cacbot-ai/NotUI/abc.txt','txt')],'user-id')
# # print(docs)
# # v.upsert(docs)
# ret = v.semantic_search('what is blueprint',mmr=False,k=5)
# print(ret)
