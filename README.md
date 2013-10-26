# mabanque-net

MaBanque.net - Gestion de comptes bancaires

Le repo comprend :
* Une application serveur écrite en node.js qui dialogue avec un MongoDB (développé par [Matthis Duclos](https://github.com/matthis-d))
* Un exemple de front en Backbone.js (développé par [Matthis Duclos](https://github.com/matthis-d))
* Un exemple de front en AngularJS

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

Node.js est un framework JS utile pour écrire des applications serveurs. Il embarque l'outil 'npm' (Node Package Manager) qui nous sera utile pour récupérer certains modules.

http://nodejs.org/

### Installer Ruby

(Nécessaire pour le projet Backbone.js, mais pas pour le projet AngularJS)

Sous Windows : http://rubyinstaller.org/downloads/  
Sinon : https://www.ruby-lang.org/fr/downloads/

Bien rajouter le répertoire /bin de l'installation de Ruby au PATH de la machine.  
(Vérfier dans la console avec la commande ruby --version)

Ruby permettra de traduire les feuilles de style Sass de bootstrap en CSS standard.

### Installer MongoDB

MongoDB est une base de données NoSQL.

http://www.mongodb.org/downloads

### Répertoire des données Mongo

Créer un répertoire vide que Mongo utilisera pour stocker ses données.

Dans le répertoire scripts/ du projet, modifier '01-startMongo.cmd' pour pointer vers le répertoire créé.

Et mettre à jour le chemin vers le répertoire bin/ de l'installation MongoDB (Ou ajouter le répertoire bin/ au path de la machine).

### Restaurer les collections (= les tables)

Les fichiers de données à restaurer se trouvent dans banquesqli-back/dump/bank

Se placer dans banquesqli-back/dump/bank et exéctuer :

    mongorestore --dbpath <répertoires des données Mongo> --db bank --collection accounts "accounts.bson"
    
    mongorestore --dbpath <répertoires des données Mongo> --db bank --collection operations "operations.bson"
    
    mongorestore --dbpath <répertoires des données Mongo> --db bank --collection tokens "tokens.bson"
    
    mongorestore --dbpath <répertoires des données Mongo> --db bank --collection users "users.bson"

Au démarrage, deux utilisateurs sont définis :
* '12345' / 'password' : utilisateur
* '1234' / 'password'  : administrateur

### Installer bower (via npm)

Bower est un gestionnaire de paquets pour une application front-end. Il nous permettra de récupérer facilement les librairies JS nécessaires.

    npm install -g bower

### Installer grunt (via npm)

Grunt est un outil de build. Il nous permettra entre autre de simuler un serveur web.

    npm install -g grunt-cli
    
### Application côté serveur - banquesqli-back/

Se positionner dans banquesqli-back/ et exécuter :

    npm install

La commande 'npm install' récupère dans un repository en ligne les modules listés dans le fichier package.json et les stocke dans le répertoire node_modules/

### Applications côté client - banquesqli-front-backbone/ et banquesqli-front-angular/

Les 2 applications sont indépendantes, chacune fonctionne très bien sans l'autre.  
Se positionner dans banquesqli-front-backbone/ ou banquesqli-front-angular/ et exécuter :

    npm install
    bower install

La commande 'bower install' récupère dans un repository en ligne les librairies listées dans le fichier bower.json et les stocke dans le répertoire app/bower_components/

## Démarrage (Windows)

Dans le répertoire scripts/ du projet, exécuter les scripts dans l'ordre indiqué.
