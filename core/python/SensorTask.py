from Sensor import *
from SensorDataPersist import *
from EmailNotifier import *
import json
import time


class SensorTask():
    def __init__(self, lock, bd_addr):
        self.sensor = Sensor(lock, bd_addr)
        self.bd_addr = bd_addr
        self.persist = SensorDataPersist()
        self.emailer = EmailNotifier()
        self.db = MongoInstanceBuilder().get_db()

    def _load(self, value):
        self.data = json.loads(value)
        self.data['date'] = time.strftime("%D-%H:%M:%S")
        self.data['sensorid'] = self.bd_addr
        return self.data

    def execute(self):
        self.sensor.start()
        self.sensor.join()
        value = self.sensor.value
        self.persist.write(self._load(value))
        self._notify_by_mail(value)

    def _notify_by_mail(self, value):
        subscribers = self.db.sensors.find_one({"_id": self.bd_addr})["subscribers"]
        for subscriber in subscribers:
            key = subscriber["keyValue"]
            value_to_check = self.data[key]
            if self._is_level_higher_than(subscriber["warninglevel"], value_to_check):
                print "Notify by mail " + subscriber["mail"]
                self.emailer.notify(self.bd_addr, subscriber)


    def _is_level_higher_than(self, max_value, actual_value):
        return float(actual_value) > float(23)
