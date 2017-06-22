import threading
from SensorTask import *


if __name__ == '__main__':
    LOCK = threading.Lock()
    BT_TASKS = []
    BT_TASKS.append(SensorTask(LOCK, "98:D3:31:70:68:51"))
    #BT_TASKS.append(SensorTask(LOCK, "00:14:03:05:8F:21"))

    for task in BT_TASKS:
        task.execute()