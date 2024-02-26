
import pymongo
from pymongo import MongoClient


mongo = MongoClient("localhost", 27017)
db = mongo.CACBOT
# CACBOT is the name of the database