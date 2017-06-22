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

    def _load(self, value):
        data = json.loads(value)
        data['date'] = time.strftime("%D-%H:%M:%S")
        data['sensorid'] = self.bd_addr
        return data

    def execute(self):
        self.sensor.start()
        self.sensor.join()
        value = self.sensor.value
        self.persist.write(self._load(value))
        self.emailer.notify(self.bd_addr)
        #self._check_value(value)

    def _check_value(self, value):
        value_to_check = self.data[key]
        if self._is_level_higher_than(value_to_check):
            self.emailer.start_smtp().send_email_to(self.config['email'], self.config['alertMsg'])

    def _is_level_higher_than(self, value):
        return float(value) < float(self.config['warninglevel'])
