# mabanque-net

MaBanque.net - Gestion de comptes bancaires en angularjs

## Prérequis

Cette application 'front' s'appuie sur un backend Node.js qui expose des web-services REST.

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
