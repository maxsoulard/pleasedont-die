# pleasedont-die
> python

## Setup

``` bash
sudo apt-get install --no-install-recommends bluetooth bluez blueman python-dev libbluetooth-dev python-serial bluez-simple-agent
sudo pip install pybluez

python -m pip install pymongo
```

## How to pair to HC-05 bluetooth device, using bluetoothctl
``` bash

$ bluetoothctl
[NEW] Controller 5C:F3:70:71:86:78 server [default]
[bluetooth]# power on
Changing power on succeeded
[bluetooth]# agent on
Agent registered
[bluetooth]# default-agent
Default agent request successful
[bluetooth]# scan on
Discovery started
[CHG] Controller 5C:F3:70:71:86:78 Discovering: yes
[NEW] Device 98:D3:31:70:68:51 HC-05
[bluetooth]# pair 98:D3:31:70:68:51
Attempting to pair with 98:D3:31:70:68:51
[CHG] Device 98:D3:31:70:68:51 Connected: yes
Request PIN code
[agent] Enter PIN code: 1234
[bluetooth]# exit

# In core/python
$ python SensorsBatch.py
# Now SensorsBatch.py should get data.
Thread-1 is starting...
BT connected - 98:D3:31:70:68:51
received {"temp":"25.90","hum":"61.40"}
```

## Mongo-db initial documents to be manually inserted :
```
use pleasedont-die
db.sensors.insert({"_id" : "98:D3:31:70:68:51", "type" : "temperature"})
db.sensors.insert({"_id" : "00:14:03:05:8F:21", "type" : "plant"})
```