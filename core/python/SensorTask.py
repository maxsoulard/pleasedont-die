from Sensor import *
from SensorDataPersist import *
from EmailPlantNotifier import *
from EmailTemperatureNotifier import *
import json
import datetime


class SensorTask():
    def __init__(self, lock, bd_addr):
        self.sensor = Sensor(lock, bd_addr)
        self.bd_addr = bd_addr
        self.persist = SensorDataPersist()
        self.emailer = EmailNotifier()
        self.db = MongoInstanceBuilder().get_db()

    def _load(self, value):
        self.data = json.loads(value)
        self.data['date'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.data['sensorid'] = self.bd_addr
        print self.data
        return self.data

    def execute(self):
        self.sensor.start()
        self.sensor.join()
        value = self.sensor.value
        if value is not None:
            self.persist.write(self._load(value))
            self._notify_by_mail(value)

    def _notify_by_mail(self, value):
        sensor = self.db.sensors.find_one({"_id": self.bd_addr})
        try:
            _subscribers = sensor["subscribers"]
            for _subscriber in _subscribers:
                if self._is_sensor_a_plant(sensor):
                    value_to_check = self.data["moisture"]
                    if float(value_to_check) < float(_subscriber["warninglevel"]):
                        print("Notify by mail " + _subscriber["mail"] + value_to_check)
                        emailer = EmailPlantNotifier()
                        emailer.notify(_subscriber)
        except:
            _subscribers = []

    def _is_sensor_a_plant(self, sensor):
        return sensor["type"] == "plant"