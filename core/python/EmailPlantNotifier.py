from EmailNotifier import *


text = "J'ai soif !!\nNe me laisse pas mourir :'("
html = """\
<html>
  <head></head>
  <body>
    <p><h1>J'ai soif !!</h1><br>
       Ne me laisse pas mourir :'(
    </p>
  </body>
</html>
"""

class EmailPlantNotifier(EmailNotifier):
    def __init__(self):
        EmailNotifier.__init__(self)

    def notify(self, subscriber):
        msg = self.get_message(subscriber["mail"], text, html).as_string()
        self.send_mail_to(subscriber["mail"], msg)