from BTSensor import *
import threading
import json
import time


if __name__ == '__main__':
    lock = threading.Lock()
    temp_sensor_thread = BTSensor(lock, "98:D3:31:70:68:51")
    temp_sensor_thread.start()
    temp_sensor_thread.join()
    current_date = time.strftime("%D-%H:%M:%S")
    data = json.loads(temp_sensor_thread.value)
    data['date'] = current_date
    with open('temperature.json', 'w') as f:
        json.dump(data, f)

    temp_sensor_thread = BTSensor(lock, "00:14:03:05:8F:21")
    temp_sensor_thread.start()
    temp_sensor_thread.join()
    current_date = time.strftime("%D-%H:%M:%S")
    data = json.loads(temp_sensor_thread.value)
    data['date'] = current_date
    with open('plant.json', 'w') as f:
        json.dump(data, f)
