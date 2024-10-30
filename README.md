# 📚 BookMate

**BookMate** est une application web de recommandation de livres permettant aux utilisateurs de découvrir de nouvelles lectures en fonction de leurs goûts grâce à une interface de swipe inspirée de Tinder. Les utilisateurs peuvent :
- Créer une bibliothèque personnelle
- Rechercher des livres avec des filtres avancés
- Accéder à des suggestions personnalisées basées sur leurs genres et auteurs favoris

---

## ⚙️ Prérequis

Avant de commencer, assurez-vous d’avoir installé :
- **Node.js** (v14.x ou plus)
- **MongoDB** pour le stockage des données
- Une **clé Google Books API** pour accéder aux informations de livres

---

## 🚀 Installation

Suivez ces étapes pour installer et configurer le backend de BookMate :

1. **Clonez le projet** et accédez au dossier backend :
   - git clone https://github.com/oduncica/bookmate.git
   - cd bookmate
   - cd backend

2. **Installez les dépendances** :
   npm install

3. **Configurez les variables d'environnement** en créant un fichier `.env` à la racine du dossier backend (voir [Variables d’Environnement](#🔑-variables-denvironnement)).

4. **Lancez MongoDB** pour que le backend puisse se connecter à la base de données.

5. **Démarrez le serveur** :
   npm start ou node server
   Une fois le serveur démarré, l'API sera accessible sur `http://localhost:5000` (ou le port que vous avez défini dans le fichier `.env`).

---

## 🔑 Variables d’Environnement

Dans le dossier backend, créez un fichier `.env` avec les informations de configuration suivantes :

PORT=5000
MONGO_URI=mongodb://localhost:27017/bookmateDB
GOOGLE_BOOKS_API_KEY=votre_google_books_api_key

Assurez-vous que MongoDB est en cours d'exécution pour que l'application puisse se connecter à la base de données.

--- 

## 📘 Documentation des Endpoints

Une documentation détaillée des endpoints de l'API sera fournie dans une prochaine version.

---

## 🛠️ Fonctionnalités à venir

- Amélioration de l'algorithme de recommandation
- Filtres de recherche avancés
- Tests unitaires pour les principales fonctionnalités

---

## 📝 Licence

Ce projet est sous licence MIT.
