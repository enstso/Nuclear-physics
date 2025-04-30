# 🖥️ Interface Web – Calcul Distribué (Frontend React)

Cette interface React permet aux utilisateurs :
- d’envoyer des opérations à calculer,
- de visualiser les résultats en temps réel,
- et à un administrateur authentifié de **supprimer tous les résultats** via l’API.

---


## 🔧 Environnement de développement (Docker)

### Démarrage du projet complet (API + RabbitMQ) :

```bash
docker-compose up -d --build
```

## 🚀 Lancement de l’application

```bash
# Accéder au dossier front
cd front

# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

L'application sera disponible sur :  
👉 http://localhost:5173

---

## ⚙️ Configuration

Créer un fichier `.env` à partir de `.env.example` :

```env
RABBITMQ_USER=user
RABBITMQ_PASS=password
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_URL=amqp://user:password@rabbitmq:5672
NODE_ENV=production
```

---

## 📡 Fonctionnalités

### 🧾 Envoi d'opérations

- Saisie de deux nombres (`n1`, `n2`) et choix de l'opération :
  - Addition ➕
  - Soustraction ➖
  - Multiplication ✖️
  - Division ➗
  - Tous les calculs (`ALL`) ⚙️
- Envoie la requête POST à `/calc` (via API Express)
- Résultats récupérés automatiquement via le GET `/results`

---

### 📊 Affichage des résultats

- Tableau dynamique des derniers résultats (100 derniers max)
- Mise à jour automatique ou manuelle des données

---

### 🔐 Interface administrateur (suppression des résultats)

Accessible depuis un lien ou une section dédiée.

- Requiert un login :  
  - **Nom d'utilisateur** : `admin`  
  - **Mot de passe** : `adminpassword`

- Une fois connecté, permet d’envoyer une requête DELETE vers `/results` pour **vider tous les résultats**.

---

## 🧪 Exemple d’utilisation (via navigateur)

1. Allez sur http://localhost:5173
2. Remplissez le formulaire de calcul
3. Cliquez sur "Envoyer"
4. Observez les résultats en bas
5. (Admin) Connectez-vous à la section admin pour réinitialiser les résultats
