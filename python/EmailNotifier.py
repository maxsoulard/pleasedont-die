import json
from JsonHelper import *


class EmailNotifier:
    def __init__(self, config):
        self.email = config['email']
        self.warninglevel = config['warninglevel']
        self.alertMsg = config['alertMsg']
        self.keyValue = config['keyValue']

    def subscribe_to(self, sensor_id):
        file_name = "sensor_"+sensor_id[:4]+".config"
        with open(file_name, 'w') as f:
            json.dump({'email':self.email, 'warninglevel': self.warninglevel, 'alertMsg': self.alertMsg, 'keyValue': self.keyValue}, f)

    def notify(self, email, sensor_id):
        #TODO
        return