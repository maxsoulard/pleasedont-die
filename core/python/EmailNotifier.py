import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

ME = "pleasedontdie.msoulard@gmail.com"
PASSWORD = "pleasedontdie1234"

class EmailNotifier:
    def __init__(self):
        self.server = smtplib.SMTP('smtp.gmail.com', 587)

    def start_smtp(self):
        self.server.starttls()
        self.server.login(ME, PASSWORD)
        return self

    def send_mail_to(self, subscriber_mail, msg_as_string):
        self.start_smtp()
        self.server.sendmail("pleasedontdie.msoulard@gmail.com", subscriber_mail, msg_as_string)

    def get_message(self, dest, text, html):
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Aidez-moi"
        msg['From'] = ME
        msg['To'] = dest
        # Record the MIME types of both parts - text/plain and text/html.
        part1 = MIMEText(text, 'plain')
        part2 = MIMEText(html, 'html')
        msg.attach(part1)
        msg.attach(part2)
        return msg

    def quit(self):
        self.server.quit()