import threading
from SensorTask import *


if __name__ == '__main__':
    db = MongoInstanceBuilder().get_db()
    sensors = db.sensors.find({})
    LOCK = threading.Lock()
    BT_TASKS = []
    for sensor in sensors:
        BT_TASKS.append(SensorTask(LOCK, sensor["_id"]))
    for task in BT_TASKS:
        task.execute()