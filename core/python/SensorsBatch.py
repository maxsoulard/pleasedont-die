from Sensor import *
import threading
import json
import pymongo
import time
from EmailServer import *
from pymongo import MongoClient


class SensorTask(Sensor):
    def __init__(self, lock, bd_addr):
        Sensor.__init__(self, lock, bd_addr)
        self.emailer = EmailServer()
        self.client = MongoClient()
        self.db = self.client['pleasedont-die']

    def load(self):
        self.data = json.loads(self.value)

    def write(self):
        self.data['date'] = time.strftime("%D-%H:%M:%S")
        self.data['sensorid'] = self.bd_addr
        inserted_id = self.db.data.insert_one(self.data).inserted_id
        print "Inserted ID : " + str(inserted_id) + " in pleasedont-die db"

    def notify_by_mail(self):
        # FIXME extraire dans class NotifyByMail
        file_name = "sensor_"+(self.bd_addr[:5]).replace(":", "")+".config"
        with open(file_name, 'r') as f:
            self.config = json.load(f)
        key = self.config['keyValue']
        value_to_check = self.data[key]
        if self._is_level_higher_than(value_to_check):
            self.emailer.start_smtp().send_email_to(self.config['email'], self.config['alertMsg'])

    def _is_level_higher_than(self, value):
        return float(value) < float(self.config['warninglevel'])


if __name__ == '__main__':
    LOCK = threading.Lock()
    BT_TASKS = []
    BT_TASKS.append(SensorTask(LOCK, "98:D3:31:70:68:51"))
    #BT_TASKS.append(SensorTask(LOCK, "00:14:03:05:8F:21"))

    for task in BT_TASKS:
        task.start()
        task.join()
        task.load()
        task.write()
        #task.notify_by_mail()
