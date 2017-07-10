from EmailNotifier import *


text = "J'ai chaud !!\nTu pourrais a&eacute;rer un peu :("
html = """\
<html>
  <head></head>
  <body>
    <p><h1>J'ai chaud !!</h1><br>
       Tu pourrais a&eacute;rer un peu :(
    </p>
  </body>
</html>
"""

class EmailTemperatureNotifier(EmailNotifier):
    def __init__(self):
        EmailNotifier.__init__(self)

    def notify(self, subscriber):
        msg = self.get_message(subscriber["mail"], text, html).as_string()
        self.send_mail_to(subscriber["mail"], msg)