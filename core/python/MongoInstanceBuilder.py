from pymongo import MongoClient


class MongoInstanceBuilder:
    def __init__(self):
        self.client = MongoClient('172.17.0.1')
        self.db = self.client['pleasedont-die']

    def get_db(self):
        return self.db
