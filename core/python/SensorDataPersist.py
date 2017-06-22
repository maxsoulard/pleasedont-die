from MongoInstanceBuilder import *


class SensorDataPersist():
    def __init__(self):
        self.db = MongoInstanceBuilder().get_db()

    def write(self, data):
        inserted_id = self.db.data.insert_one(data).inserted_id
        print "Inserted ID : " + str(inserted_id) + " in pleasedont-die db"