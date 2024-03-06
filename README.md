# nodeJSM1
Repository de l'évaluation du module NodeJS d'H3hitema en M1 DEV WEB par Antoine MERPILLAT

# Prérequis :

Avoir Docker sur son poste de travail. 
ID admin : admin & mot de passe : admin123

# Lancer le projet :

Pour exécuter le projet, exécutez la commande :
```bash
docker-compose -f docker-compose.yaml up
```

Ensuite pour charger les données dans le conteneur exécutez les commandes suivantes:
```bash
docker cp ./server/db.sql mysql:/db.sql
```
```bash
docker exec -it mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"'  .\server\db.sql
```

Une fois connecté à mysql dans le conteneur, il faut charger le script :
```bash
source db.sql
```