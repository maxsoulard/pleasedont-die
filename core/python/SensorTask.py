from Sensor import *
from SensorDataPersist import *
from EmailPlantNotifier import *
from EmailTemperatureNotifier import *
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
        sensor = self.db.sensors.find_one({"_id": self.bd_addr})
        for subscriber in sensor["subscribers"]:
            key = subscriber["keyValue"]
            value_to_check = self.data[key]
            if sensor["type"] == "plant" and float(value_to_check) < float(subscriber["warninglevel"]):
                print "Notify by mail " + subscriber["mail"] + value_to_check
                emailer = EmailPlantNotifier()
                emailer.notify(subscriber)
            elif sensor["type"] == "temperature" and float(value_to_check) > float(subscriber["warninglevel"]):
                print "Notify by mail " + subscriber["mail"]
                emailer = EmailTemperatureNotifier()
                emailer.notify(subscriber)

    def _is_level_higher_than(self, max_value, actual_value):
        return float(actual_value) > float(max_value)
