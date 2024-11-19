# 📚 BookMate

**BookMate** est une application web de recommandation de livres, permettant aux utilisateurs de découvrir de nouvelles lectures en fonction de leurs goûts grâce à une interface de swipe inspirée de Tinder. Les utilisateurs peuvent :

- 📖 Créer une bibliothèque personnelle
- 🔍 Rechercher des livres avec des filtres avancés
- ⭐ Accéder à des suggestions personnalisées basées sur leurs genres et auteurs favoris

---

## ⚙️ Prérequis

Avant de commencer, assurez-vous d’avoir installé :

- **Node.js** (v14.x ou plus)
- **MongoDB** pour le stockage des données
- **Google Books API Key** pour accéder aux informations de livres

---

## 🚀 Installation

### 1. Cloner le Projet

Clonez le projet et accédez au dossier principal :

```bash
git clone git@github.com:oduncica/bookmate.git
cd bookmate
```

### 2. Installation des Dépendances

Installez les dépendances pour le **frontend** et le **backend** depuis la racine de **BookMate** :

```bash
npm install
```

Cette commande va installer les dépendances pour le **backend** et le **frontend** dans les dossiers appropriés.

### 3. Configuration du fichier `.env`

Le fichier `.env` doit se trouver à la racine du dossier **BookMate** (au même niveau que les dossiers **backend** et **frontend**). Créez ce fichier avec les informations suivantes :

```plaintext
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookmateDB
GOOGLE_BOOKS_API_KEY=votre_google_books_api_key
JWT_SECRET=votre_jwt_secret
```

Assurez-vous que MongoDB est en cours d'exécution pour que l'application puisse se connecter à la base de données.

### 4. Démarrer le Backend

Depuis la racine du dossier **BookMate**, lancez le serveur backend avec la commande suivante :

```bash
npm run dev
```

Le serveur backend démarrera et sera accessible sur `http://localhost:3000` (ou le port défini dans le fichier `.env`).

### 5. Démarrer le Frontend

1. Accédez au dossier **frontend** :

   ```bash
   cd frontend
   ```

2. Lancez l'application frontend avec la commande suivante :

   ```bash
   npm run dev
   ```

Le frontend sera accessible sur `http://localhost:5173` (ou le port défini dans Vite).

---

## 📘 Documentation des Endpoints

Une documentation détaillée des endpoints de l'API sera fournie dans une prochaine version.

## 🎨 Technologies Utilisées

### Backend
- **Node.js & Express** pour le serveur
- **MongoDB & Mongoose** pour la base de données
- **JWT** pour l’authentification des utilisateurs

### Frontend
- **React** avec **Vite** pour la rapidité et les fonctionnalités modernes
- **Tailwind CSS** pour le design responsive et minimaliste
- **React Router** pour la navigation

---

## 🛠️ Fonctionnalités à Venir

- ✨ Amélioration de l'algorithme de recommandation
- 🔄 Filtres de recherche avancés
- 🧪 Tests unitaires pour les principales fonctionnalités
- 📄 Documentation API complète

---

## 📝 Licence

Ce projet est sous licence MIT.
