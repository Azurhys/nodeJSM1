# nodeJSM1
Repository de l'évaluation du module NodeJS d'H3hitema en M1 DEV WEB par Antoine MERPILLAT

# Prérequis :

Avoir Docker sur son poste de travail. 

# Lancer le projet :

Pour exécuter le projet, exécutez la commande :
    ```docker-compose -f docker-compose.yaml up```

Ensuite pour charger les données dans le conteneur exécutez les commandes suivantes
    ```docker cp ./server/db.sql mysql:/db.sql```
    ```docker exec -it mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"'  .\server\db.sql```

Une fois connecté à mysql dans le conteneur, il faut charger le script :
    ```source db.sql```