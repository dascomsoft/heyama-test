
# Heyama Test - Projet Fullstack

Ce projet est une application de gestion d'objets développée dans le cadre du test technique pour Heyama.

## Structure du projet

Le projet est divisé en deux parties principales :

- **/api** : Backend NestJS avec MongoDB
- **/web** : Frontend Next.js avec shadcn/ui

## Choix techniques

### Frontend - Next.js
J'ai choisi Next.js car je suis à l'aise avec React et que Next.js offre une structure claire pour organiser les pages et les composants. L'utilisation de shadcn/ui m'a permis d'avoir des composants accessibles sans perdre de temps sur le design, ce qui n'était pas la priorité du test.

### Backend - NestJS
N'ayant pas d'expérience approfondie avec NestJS avant ce test, j'ai découvert cette technologie pendant le développement. NestJS propose une architecture modulaire et structurée qui facilite l'organisation du code backend.

### Base de données - MongoDB Atlas
J'ai opté pour MongoDB Atlas plutôt qu'une installation locale pour plusieurs raisons :
- Pas d'installation complexe sur ma machine
- Données accessibles depuis n'importe où
- Interface graphique pour visualiser les données
- C'est ce qui se fait couramment en entreprise

### Stockage d'images - Cloudinary
Pour les images, j'ai utilisé Cloudinary car :
- Upload direct depuis le frontend (simplicité)
- Pas besoin de gérer le stockage côté backend
- Transformation d'images possible si besoin
- Compte gratuit généreux

Je sais que la consigne mentionnait un service S3, mais j'ai fait ce choix pour sa simplicité d'implémentation et son efficacité. Je reste disponible pour discuter de cette décision.

## Fonctionnalités implémentées

- Création d'un objet avec titre, description et image
- Affichage de la liste de tous les objets
- Consultation du détail d'un objet
- Suppression d'un objet
- Upload d'images vers Cloudinary
- Stockage des données dans MongoDB Atlas

## Installation et lancement

1. Cloner le projet
   git clone https://github.com/dascomsoft/heyama-test.git
cd heyama-test
2. Lancer l'API
cd api
npm install
npm run start:dev

text
L'API tourne sur http://localhost:3001

3. Lancer le frontend
cd web
npm install
npm run dev

text
L'application est accessible sur http://localhost:3000

## Configuration requise

- Node.js (version 18 ou supérieure)
- Un compte Cloudinary (gratuit) pour les images
- Connexion internet pour MongoDB Atlas

## Remarques

- L'application utilise MongoDB Atlas, donc une connexion internet est nécessaire
- Les images sont uploadées directement vers Cloudinary depuis le frontend
- Les données persistent dans le cloud, même après arrêt du serveur

## Ce qui pourrait être amélioré

- Ajout de Socket.IO pour le temps réel entre les clients
- Gestion de la suppression des images sur Cloudinary
- Système d'authentification
- Tests unitaires et e2e
- Déploiement en ligne
