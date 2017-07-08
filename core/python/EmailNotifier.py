import json
from MongoInstanceBuilder import *
from EmailServer import *


class EmailNotifier:
    def __init__(self):
        self.emailserver = EmailServer()

    def notify(self, sensor_id, subscriber):
        self.emailserver.start_smtp().send_email_to(subscriber["mail"], "J'ai chaud !!")