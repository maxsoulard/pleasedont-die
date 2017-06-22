from pymongo import MongoClient


class MongoInstanceBuilder:
    def __init__(self):
        self.client = MongoClient()
        self.db = self.client['pleasedont-die']

    def get_db(self):
        return self.db