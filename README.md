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

### Installer Git

Git est un outil de versionning. Il nous sera utile pour récupérer les sources du projet.

http://git-scm.com/

Sinon, vous pouvez télécharger les sources au format ZIP.

### Récupérer les sources (via git)

    git clone https://github.com/cedric25/mabanque-net

### Installer Node.js

Node.js est un framework JS utile pour les applications serveurs. Il embarque l'outil 'npm' (Node Package Manager) qui nous sera utile pour récupérer certains modules.

http://nodejs.org/

### Installer MongoDB

MongoDB est une base de données NoSQL.

http://www.mongodb.org/downloads

### Répertoire des données Mongo

Créer un répertoire vide que Mongo utilisera pour stocker ses données.

Dans le répertoire scripts/ du projet, modifier '01-startMongo.cmd' pour pointer vers le répertoire créé.

Et mettre à jour le chemin vers le répertoire bin/ de l'installation MongoDB (Ou ajouter le répertoire bin/ au path de la machine).

### Restaurer les collections (= les tables)

Les fichiers de données à restaurer se trouvent dans banquesqli-back/dump/bank

    mongorestore --dbpath <répertoires des données Mongo> --db bank --collection accounts "accounts.bson"
    
    mongorestore --dbpath <répertoires des données Mongo> --db bank --collection operations "operations.bson"
    
    mongorestore --dbpath <répertoires des données Mongo> --db bank --collection tokens "tokens.bson"
    
    mongorestore --dbpath <répertoires des données Mongo> --db bank --collection users "users.bson"

Au démarrage, deux utilisateurs sont définis :
* '12345' / 'password' : utilisateur
* '1234' / 'password'  : administrateur

### Installer bower (via npm)

Bower est un gestionnaire de paquet pour une application front-end. Il nous permettra de récupérer facilement les librairies JS nécessaires.

    npm install -g bower

### Installer grunt (via npm)

Grunt est un outil de build. Il nous permettra entre autre de simuler un serveur web.

    npm install -g grunt-cli
    
### Partie serveur - banquesqli-back/

Récupérer les modules utiles à l'application serveur :

    npm install

La commande npm récupère dans un repository en ligne les modules listés dans le fichier package.json et les stocke dans le répertoire node_modules/

### Front backbone - banquesqli-front-backbone/

    npm install
    bower install

La commande bower récupère dans un repository en ligne les librairies listées dans le fichier bower.json et les stocke dans le répertoire app/bower_components/

### Front angular - banquesqli-front-angular/

    npm install
    bower install

## Démarrage (Windows)

Dans le répertoire scripts/ du projet, exécuter les scripts dans l'ordre indiqué.
