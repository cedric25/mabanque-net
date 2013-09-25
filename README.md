# mabanque-net

MaBanque.net - Gestion de comptes bancaires

Le repo comprend :
* Un serveur en node.js qui dialogue avec un MongoDB (développé par Matthis Duclos)
* Un front en Backbone.js (développé par Matthis Duclos)
* Un front en AngularJS

## Fonctionnalités

* Authentification
* Liste des comptes
* Détail des opérations par compte
* Virement
* Administration des utilisateurs, des comptes et des opérations

## Installation

    git clone https://github.com/cedric25/mabanque-net.git

### Initialisation de la base de données

Les fichiers de données MongoDB se trouvent dans banquesqli-back/dump/bank

Au démarrage, deux utilisateurs sont définis :
* '12345' / 'password' : utilisateur
* '1234' / 'password'  : administrateur
    
### Partie serveur - banquesqli-back/

    npm install

### Front backbone - banquesqli-front-backbone/

    npm install
    bower install

### Front angular - banquesqli-front-angular/

    npm install
    bower install

## Démarrage (Windows)

Dans le répertoire scripts/, modifier '01-startMongo.cmd' pour pointer vers un répertoire correct de données Mongo.

Exécuter ensuite les scripts dans l'ordre indiqué.
