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

    git clone git@github.com:cedric25/mabanque-net.git
    cd mabanque-net
    npm install
    bower install

## Démarrage

Démarrer un MongoDB :
		mongod --dbpath "D:\Perso\Node_book\mongodb-win32-x86_64-2.2.2\data"

Démarrer la partie serveur :
		cd banquesqli-back
		node app

Démarrer la partie front :
		cd banquesqli-front-angular01
		grunt server
