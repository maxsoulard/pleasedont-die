#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <SoftwareSerial.h>

// HC-05 bluetooth
SoftwareSerial BT(10, 11);
char input;
// creates a "virtual" serial port/UART
// connect BT module TX to D10
// connect BT module RX to D11
// connect BT Vcc to 5V, GND to GND

// DHT22 temperature sensor
#define DHTPIN            2
#define DHTTYPE           DHT22     // DHT 22 (AM2302)
DHT_Unified dht(DHTPIN, DHTTYPE);

void setup()  
{
  BT.begin(9600);
  dht.begin();
  sensor_t sensor;
}
void loop() 
{
  if (BT.available())
  // if text arrived in from BT serial...
  {
    input = (BT.read());
    if (input == '1')
    {
      // Get temperature event and print its value.
      sensors_event_t event;  
      dht.temperature().getEvent(&event);
      float temperature = event.temperature;
      dht.humidity().getEvent(&event);
      float humidity = event.relative_humidity;
      if (isnan(temperature) || isnan(humidity)) {
        BT.println("Error reading DHT22 values !");
      }
      else {
        // Return result on BT
        String resStr = "{\"temp\":\"";
        resStr.concat(temperature);
        resStr.concat("\",");
        
        resStr.concat("\"hum\":\"");
        resStr.concat(humidity);
        resStr.concat("\"}");
        BT.println(resStr);
      }
    }
    // HELP
    if (input == '?')
    {
      BT.println("Pleasedont-die BT Node help");
      BT.println("Send '1' to get value");
    }
  }
}
