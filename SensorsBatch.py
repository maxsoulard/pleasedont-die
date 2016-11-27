from Sensor import *
import threading
import json
import time


class SensorTask(Sensor):
    def __init__(self, lock, bd_addr, file_name):
        self.file_name = file_name
        Sensor.__init__(self, lock, bd_addr)

    def write(self):
        data = json.loads(self.value)
        data['date'] = time.strftime("%D-%H:%M:%S")
        with open(self.file_name, 'w') as f:
            json.dump(data, f)


if __name__ == '__main__':
    LOCK = threading.Lock()
    BT_TASKS = []
    BT_TASKS.append(SensorTask(LOCK, "98:D3:31:70:68:51", 'temperature.json'))
    BT_TASKS.append(SensorTask(LOCK, "00:14:03:05:8F:21", 'plant.json'))

    for task in BT_TASKS:
        task.start()
        task.join()
        task.write()
