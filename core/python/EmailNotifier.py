import json
from MongoInstanceBuilder import *
from EmailServer import *


class EmailNotifier:
    def __init__(self):
        #self.email = config['email']
        #self.warninglevel = config['warninglevel']
        #self.alertMsg = config['alertMsg']
        #self.keyValue = config['keyValue']
        self.db = MongoInstanceBuilder().get_db()
        self.emailserver = EmailServer()

    #TODO subscribe_to(self, sensor_id):

    def notify(self, sensor_id):
        subscribers = self.db.sensors.find_one({"_id": sensor_id})["subscribers"]
        for subscriber in subscribers:
            print "TODO notify by mail " + subscriber["mail"]
            #self.emailserver.start_smtp().send_email_to(subscriber["mail"], "")