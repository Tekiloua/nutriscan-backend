#include <Stepper.h>

const byte echo = 8;
const byte trig = 9;
const byte echo2 = 6;
const byte trig2 = 7;
const byte stepsPerRevolution = 200;  // change this to fit the number of steps per revolution
// for your motor
long temps;
float distance;
long temps2;
float distance2;
// initialize the stepper library on pins 2 through 5:
Stepper myStepper(stepsPerRevolution, 2, 3, 4, 5);

void setup() {
  /*pinMode(10,OUTPUT);
  pinMode(11,OUTPUT);

  pinMode(trig,OUTPUT);
  pinMode(echo,INPUT);
  
  pinMode(trig2,OUTPUT);
  pinMode(echo2,INPUT);
  
  digitalWrite(10,HIGH);
  digitalWrite(11,HIGH);

  digitalWrite(trig,LOW);
  digitalWrite(trig2,LOW);*/
  
  myStepper.setSpeed(80);
  Serial.begin(9600);
}

void loop() {
   //lancer le moteur
   myStepper.step(100);
  // step one revolution  in one direction:
  /*if(distance>14 && distance2>14)
  else delay(2000);
  digitalWrite(trig,HIGH);
  delay(10);
  digitalWrite(trig,LOW);
  temps = pulseIn(echo,HIGH);
  if(temps>25000){
    Serial.println("Echec de la mesure");
  }
  else{
    temps = temps/2;
    distance = (temps*340)/10000.0;
    Serial.print("Distance : ");
    Serial.println(distance);
  }

  digitalWrite(trig2,HIGH);
  delay(10);
  digitalWrite(trig2,LOW);
  
  temps2 = pulseIn(echo2,HIGH);
  if(temps2>25000){
    Serial.println("Echec de la mesure");
  }
  else{
    temps2 = temps2/2;
    distance2 = (temps2*340)/10000.0;
    Serial.print("Distance 2 : ");
    Serial.println(distance2);
  }*/
}