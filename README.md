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
git clone https://github.com/oduncica/bookmate.git
cd bookmate
```

### 2. Installation et Configuration Backend

1. Accédez au dossier backend :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env` dans le dossier backend avec les variables d'environnement nécessaires (voir section **Variables d’Environnement** ci-dessous).
4. Lancez MongoDB pour que le backend puisse se connecter à la base de données.
5. Démarrez le serveur :
   ```bash
   npm start
   ```
6. Une fois le serveur démarré, l'API sera accessible sur `http://localhost:5000` (ou le port défini dans le fichier `.env`).

### 3. Installation et Configuration Frontend

1. Accédez au dossier frontend :
   ```bash
   cd ../frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Démarrez l’application frontend avec Vite :
   ```bash
   npm run dev
   ```
4. L'application sera accessible sur `http://localhost:5173` (ou le port défini dans Vite).

---

## 🔑 Variables d’Environnement

Dans le dossier **backend**, créez un fichier `.env` avec les informations de configuration suivantes :

```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookmateDB
GOOGLE_BOOKS_API_KEY=votre_google_books_api_key
JWT_SECRET=votre_jwt_secret
```

Assurez-vous que MongoDB est en cours d'exécution pour que l'application puisse se connecter à la base de données.

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
