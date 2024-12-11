# README - Gestion des réservations et des patients dans un cabinet médical

## Introduction
Ce projet de fin d'études (PFE) vise à développer un système de gestion des réservations et des patients dans un cabinet médical. Ce système facilite la réservation en ligne des rendez-vous pour les patients et simplifie la gestion des réservations et des dossiers des patients pour les administrateurs du cabinet. Le projet utilise des technologies modernes de développement web et suit les bonnes pratiques de conception logicielle.

https://github.com/user-attachments/assets/ba70cc0b-a5ca-4640-a0b7-730049c0285a


## Fonctionnalités principales

### Pour les patients
- **Prise de rendez-vous en ligne** : Accès à une plateforme intuitive de réservation.
- **Consultation des disponibilités** : Affichage des créneaux horaires disponibles.
- **Accès à l’historique des rendez-vous** : Possibilité de consulter les réservations passées.
- **Interaction avec le support** : Fonctionnalité de demande d’assistance via l’interface utilisateur.

### Pour les administrateurs
- **Gestion des patients** : Ajout, modification et suppression des informations des patients.
- **Gestion des réservations** : Consultation, modification, ajout et suppression des réservations.
- **Tableau de bord** : Vue d’ensemble des activités clés du cabinet (patients, consultations, réservations, ordonnances).
- **Suivi des consultations** : Gestion des consultations médicales des patients.

## Architecture du projet
Le système adopte une architecture **MVC (Modèle-Vue-Contrôleur)** pour assurer la séparation des préoccupations et faciliter la maintenance et l’évolution du code.

- **Modèle (Model)** : Représente la logique métier et la gestion des données (patients, réservations, consultations).
- **Vue (View)** : Gère l’interface utilisateur et l’affichage des données.
- **Contrôleur (Controller)** : Sert d’intermédiaire entre la vue et le modèle, gère les entrées utilisateur et met à jour le modèle et la vue.

## Technologies utilisées
- **Frontend** : HTML, CSS, JavaScript, Vue.js, Bootstrap
- **Backend** : PHP, Laravel
- **Base de données** : MySQL
- **Outils de conception** : Balsamiq (maquettage), StarUML (modélisation UML), MindMeister (cartographie mentale)
- **Outils de développement** : Visual Studio Code (IDE), GitHub (gestion de version)

## Prérequis
Avant de lancer le projet, assurez-vous d’avoir les éléments suivants installés sur votre machine :
- **PHP** (v7.4 ou supérieure)
- **MySQL** (v8.0 ou supérieure)
- **Composer** (pour la gestion des dépendances de Laravel)
- **Node.js** (pour les outils de compilation front-end)

## Installation

- **Backend**

1. **Clonez le dépôt Git** :
   ```bash
   https://github.com/Bouquennouche/PFE.git
   cd Backend/PFE-main
   ```

2. **Installez les dépendances backend** :
   ```bash
   composer install
   ```

3. **Configurez l’application** :
   - Copiez le fichier `.env.example` en `.env` :
     ```bash
     cp .env.example .env
     ```
   - Configurez les variables de connexion à la base de données dans le fichier `.env` (DB_DATABASE, DB_USERNAME, DB_PASSWORD).

4. **Générez la clé de l’application** :
   ```bash
   php artisan key:generate
   ```

5. **Lancez les migrations et les seeders** (pour créer la base de données et insérer des données de démonstration) :
   ```bash
   php artisan migrate --seed
   ```

6. **Lancez le serveur de développement** :
   ```bash
   php artisan serve
   ```
6. **Lancez le serveur de développement** :

- **Frontend**

1. **Installez les dépendances backend** :
    ```bash
   cd ./Frontend/Admin_app
   npm install
   ```
   et

   ```bash
   cd ./Frontend/Admin_app
   npm install
   ```
6. **Lancez le serveur de développement** :
   ```bash
   npm run serve
   ```


## Utilisation
Accédez à l’application via le navigateur à l’adresse suivante :
```
http://localhost:8000
```

**Comptes de démonstration** :
- **Administrateur** : email - `admin@example.com`, mot de passe - `admin123`
- **Patient** : Créez un compte de démonstration via l’interface de réservation.

## Arborescence du projet
```
projet-cabinet-medical/
├── PFE/            # Projet complet
   ├──Frontend      # Partie Frontend
   ├──Backend       # Partie Backend
```

## Sécurité des données
- **Sécurité des informations patients** : Les données des patients sont protégées par des systèmes de chiffrement conformes aux normes RGPD.
- **Accès réservé** : Les utilisateurs doivent s’authentifier avant d’accéder à certaines parties du système.
- **Chiffrement des mots de passe** : Les mots de passe des utilisateurs sont hachés à l’aide de l’algorithme bcrypt.

## Auteur
- **BOUQUENNOUCHE Ayoub**


## Licence
Ce projet est sous licence MIT. Vous êtes libre de l’utiliser, de le modifier et de le redistribuer conformément aux termes de cette licence.

