#include "SoftwareSerial.h"

#define SENSORPIN A0
#define ACTIVATEPIN 9

// HC-05 bluetooth
SoftwareSerial BT(A5, A4);
char input;

void setup() {
  BT.begin(9600);
}

void loop() {
  if (BT.available())
  // if text arrived in from BT serial...
  {
    input = (BT.read());
    if (input == '1')
    {
      // Get the value from sensor
      digitalWrite(ACTIVATEPIN, HIGH);
      delay(200);
      double moistureValue = analogRead(SENSORPIN);
      digitalWrite(ACTIVATEPIN, LOW);        
      if (isnan(moistureValue)) {
        BT.println("Error reading values !");
      }
      else {
        // Return result on BT
        String resStr = "{\"moisture\":\"";
        resStr.concat(moistureValue);
        resStr.concat("\"}");
        BT.println(resStr);
      }
    }
    // HELP
    else if (input == '?')
    {
      BT.println("Pleasedont-die BT Node help");
      BT.println("Send '1' to get value");
    }
  }
}
