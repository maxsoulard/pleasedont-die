import bluetooth
from threading import Thread


class Sensor(Thread):
    def __init__(self, lock, bd_addr):
        Thread.__init__(self)
        self.bd_addr = bd_addr
        self.port = 1
        self.sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
        self.lock = lock
        self.value = ""

    def __connect__(self):
        self.sock.connect((self.bd_addr, self.port))
        print "BT connected - %s" % (self.bd_addr)
        return self

    def __read_value__(self):
        self.sock.send("1")
        resultstr = ""
        try:
            while True:
                data = self.sock.recv(1024)
                if len(data) == 0:
                    break
                resultstr += data
                if '}' in data:
                    break
        except IOError:
            pass
        self.value = resultstr
        self.sock.close()
        print("received %s" % resultstr)
        return resultstr

    def run(self):
        print("%s is starting..." %(self.name))
        self.lock.acquire()
        self.__connect__()
        self.value = self.__read_value__()
        self.lock.release()
