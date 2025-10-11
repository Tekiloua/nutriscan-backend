from machine import Pin
from hx711 import HX711
#import _thread
import urequests as requests
import time
import ujson
import network 
from machine import Pin
from time import sleep     

dout_pin = 23
sck_pin = 22

hx = HX711(dout_pin, sck_pin)
print("Activation du balance en cours...")
hx.tare()  # Mise à zéro (sans poids)
hx.set_scale(240.0)  # À ajuster selon l'étalonnage
print("Balance activé")

sta_if = network.WLAN(network.STA_IF)

WIFI_NAME = "mami-FX503VM"
WIFI_PASSWORD = "00000000"

def connexion() :
    sta_if.active(True)
    time.sleep(0.2)
    while not sta_if.isconnected() :
        try:
            sta_if.connect(WIFI_NAME, WIFI_PASSWORD)
            time.sleep(0.4)
        except:
            print("Erreur de connexion !")
            time.sleep(0.3)


request_url_insert_poids = "http://10.42.0.1:8080/api/poids/add"
request_url_insert_aliment = "http://10.42.0.1:3001/aliment"
request_url_insert_canweigh = "http://10.42.0.1:3001/can-weigh" # also url for GET request

#connexion()
# canWeigh = False
# poids = hx.get_weight(3)

'''def fetch_canweigh():
    global canWeigh, poids
    while True:
        try:
            res = requests.get(url=request_url_insert_canweigh)
            time.sleep(2)
            print(res.text)
            if res.json()["data"]["valeur"]==1:
                canWeigh = True
            else :
                canWeigh = False
        except:
            print("canweigh non recupérer ",canWeigh)
        if canWeigh :
            # Envoi du poids vers la bdd
            try:
                res = requests.post(request_url_insert_poids, headers = {'content-type': 'application/json'}, data = ujson.dumps({"valeur":poids}))
                print(res.text)
                time.sleep(0.5)
                res = requests.post(request_url_insert_canweigh, headers = {'content-type': 'application/json'}, data = ujson.dumps({"valeur":0}))
                print(res.text)
                led_poids.value(0)
            except :
                print("Erreur d'envoie poids ! , ",poids)
                canWeigh = False
                led_poids.value(0)
'''
def afficher_poids():
    global poids
    while True:
        poids = hx.get_weight(3)  # Lire le poids moyen sur 5 mesures
        print("Poids: {:.2f} g".format(poids))
        time.sleep(0.4)

#_thread.start_new_thread(fetch_canweigh, ())
#_thread.start_new_thread(afficher_poids, ())
boutton = Pin(19,Pin.IN, Pin.PULL_UP)
led = Pin(5,Pin.OUT)
led.off()
can_send = False
while True :
    #poids = hx.get_weight(3)  # Lire le poids moyen sur 5 mesures
    #print("Poids: {:.2f} g".format(poids))
    afficher_poids()
    can_send = False
    if boutton.value() == 0:
        can_send = True
    if can_send:
        try:
            res = requests.post(request_url_insert_poids, headers = {'content-type': 'application/json'}, data = ujson.dumps({"valeur":1.2}))
            time.sleep(0.1)
            led.on()
            print(res.text)
            time.sleep(2)
            led.off()
            can_send = False
        except :
            print("Erreur d'envoie poids ! , ")
    time.sleep(0.05)
    #time.sleep(1)
    print("ok")
