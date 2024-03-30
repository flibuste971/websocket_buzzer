
# Configuration préliminaire

## 1. Avec poetry 
Si vous possédez le package poetry, placez-vous dans n'importe quel répertoire et tapez la commande suivante :
```bash
poetry update
```

## 2. Avec pip
Si vous préférez utiliser pip, placez-vous dans le répertoire racine et tapez la commande suivante :
```
pip install -r requirements.txt
```


# Comment lancer l'application web ? 
Placez-vous dans l'environnement avec la commande :

``` bash
poetry shell
```

## 1. Lancer le websocket

Placez-vous dans le répertoire **/websocket_buzzer/websocket** et lancez le websocket avec la commande :
```bash
python app.py
```
Le terminal d'où sera lancée la commande sera bloquée tant que le websocket est actif.


## 2. Lancer le serveur web 

Placez-vous dans le répertoire/ **/websocket_buzzer/webserver** et lancez le web server avec la commande :
```bash
flask run --host=0.0.0.0
```
Il devrait être écrit dans le terminal le port ainsi que l'ip du serveur web.

**Note**: pour que des joueurs puissent se connecter et jouer entre eux, il faut qu'ils se situent sur le même réseau que le serveur.
