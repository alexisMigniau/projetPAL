# Projet PAL

## Prérequis
 - [Docker](https://docs.docker.com/engine/install/debian/#install-using-the-repository)
 - [Docker-compose](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)

## Installation
 - Copier le fichier .env.example en .env et adapter les valeurs si besoin
 
 - Lancement de l'application : 

```bash
sudo make
```
 - Afficher logs du back :

```bash
sudo make back
```

 - Afficher logs du front :

```bash
sudo make front
```

## Commandes

 - Stopper tous les conteneurs et supprimes les volumes associés

```bash
sudo make clean
```

## Services

Accès par défaut :

- API : [localhost:3000](http://localhost:3000/)
- Documentation de l'API : [localhost:3000/docs](http://localhost:3000/docs)
- Front : [localhost:5000](http://localhost:5000/)
- PhpMyAdmin : [localhost:8080](http://localhost:8080/)
- MySQL : [localhost:4000](http://localhost:4000/)