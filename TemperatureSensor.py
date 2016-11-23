__author__ = 'max'
import bluetooth


class TemperatureSensor:
    def __init__(self):
        self.bd_addr = "98:D3:31:70:68:51"
        self.port = 1
        self.sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)

    def connect(self):
        self.sock.connect((self.bd_addr, self.port))

    def readvalue(self):
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
        self.sock.close()
        print("received %s" % resultstr)
        return resultstr
