import smtplib


class EmailServer:
    def __init__(self):
        self.server = smtplib.SMTP('smtp.gmail.com', 587)


    def start_smtp(self):
        self.server.starttls()
        self.server.login("pleasedontdie.msoulard@gmail.com", "pleasedontdie1234")
        return self


    def send_email_to(self, dest, msg):
        self.server.sendmail("pleasedontdie.msoulard@gmail.com", dest, msg)


    def quit(self):
        self.server.quit()
