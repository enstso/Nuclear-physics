

# 🖥️ Interface Web – Calcul Distribué (Frontend React)

Ce projet permet d'envoyer des calculs (addition, soustraction, multiplication, division) à une API backend distribuée. Les résultats des calculs sont affichés en temps réel dans une interface utilisateur React. De plus, une interface administrateur permet de gérer les résultats (notamment les supprimer).

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- **Docker** pour lancer l'application en utilisant des containers.
- **Node.js** et **npm** pour gérer les dépendances frontend.

---

## 🔧 Environnement de développement (Docker)

### Démarrage du projet complet (API + RabbitMQ)

1. **Clonez le repository** :

```bash
git clone https://github.com/enstso/Nuclear-physics.git
cd Nuclear-physics
git checkout front
```

2. **Démarrez le projet complet avec Docker** :

```bash
docker-compose up -d --build
```

Cela lancera l'API et RabbitMQ dans des containers Docker.

---

## 🚀 Lancer l’application

### 1. Accédez au dossier **front**

```bash
cd front
```

### 2. Installez les dépendances nécessaires

```bash
npm install
```

### 3. Lancez l'application

```bash
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173).

---

## ⚙️ Configuration

Créez un fichier `.env` à partir de `.env.example` pour configurer les variables d'environnement.

Exemple de contenu pour le fichier `.env` :

```bash
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

L'utilisateur peut saisir deux nombres (`n1` et `n2`) et sélectionner une opération parmi les suivantes :

- **Addition ➕**
- **Soustraction ➖**
- **Multiplication ✖️**
- **Division ➗**
- **Tous les calculs (ALL) ⚙️**

Lorsque l'utilisateur soumet le formulaire, une requête `POST` est envoyée à l'API sur l'endpoint `/calc`. Les résultats sont ensuite récupérés via une requête `GET` à `/results`.

<img width="952" alt="image" src="https://github.com/user-attachments/assets/43a43dca-bc06-4ed7-a519-924f15c8b1fc" />


### 📊 Affichage des résultats

Les résultats des opérations sont affichés dans un tableau dynamique avec un maximum de 100 derniers résultats. Les données peuvent être mises à jour automatiquement ou manuellement.

- **Affichage en temps réel** : Les résultats se mettent à jour dès qu'une nouvelle opération est effectuée.
- **Tableau dynamique** : Les derniers résultats sont visibles en haut de la liste.

<img width="956" alt="image" src="https://github.com/user-attachments/assets/3fe08aaf-a0a3-430f-b818-3aadb89d91b5" />


---

### 🔐 Interface administrateur (Suppression des résultats)

L'interface administrateur permet de supprimer tous les résultats calculés. Cette fonctionnalité est protégée par un système de **login**.
<img width="959" alt="image" src="https://github.com/user-attachments/assets/3d046017-53bc-487f-943e-f5b4ebcb3976" />


**Identifiants de connexion admin** :

- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `adminpassword`

Une fois connecté, l'administrateur peut vider les résultats en envoyant une requête `DELETE` à l'API pour supprimer tous les résultats stockés.

#### **Capture de la page admin avant suppression** :
L'administrateur peut voir le tableau des résultats et choisir de les supprimer.

<img width="958" alt="image" src="https://github.com/user-attachments/assets/41d5bf68-742f-4255-bacc-b5f79174156f" />


#### **Capture de la page admin après suppression** :
Après avoir cliqué sur "Supprimer tous les résultats", les résultats seront vidés.

<img width="959" alt="image" src="https://github.com/user-attachments/assets/52f5a96a-44d4-48c1-bb8c-5acd55562408" />

<img width="959" alt="image" src="https://github.com/user-attachments/assets/2a23bea3-a79f-40e4-992c-78f5901b0bf4" />


---

## 🧪 Exemple d’utilisation (via navigateur)

### Étapes pour utiliser l'application :

1. **Accédez à l'interface utilisateur** :
   Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

2. **Saisie des calculs** :
   Saisissez deux nombres et sélectionnez une opération (addition, soustraction, multiplication, division, ou "Tous les calculs").

  
<img width="956" alt="image" src="https://github.com/user-attachments/assets/3fe08aaf-a0a3-430f-b818-3aadb89d91b5" />


3. **Envoyer l'opération** :
   Cliquez sur "Envoyer". Les résultats seront envoyés et affichés sous forme de liste, avec les derniers résultats affichés en haut.

4. **Observer les résultats** :
   Une fois l'opération envoyée, le tableau des résultats sera mis à jour automatiquement avec les résultats des calculs effectués.

5. **Interface Admin** :
   Connectez-vous avec les identifiants `admin/adminpassword` pour accéder à la section administrateur et réinitialiser les résultats en cliquant sur "Supprimer tous les résultats".

---

## 📸 Captures d’écran

### Page de connexion (admin)

<img width="959" alt="image" src="https://github.com/user-attachments/assets/3d046017-53bc-487f-943e-f5b4ebcb3976" />


### Formulaire de calcul (Envoi de l'opération)

<img width="956" alt="image" src="https://github.com/user-attachments/assets/3fe08aaf-a0a3-430f-b818-3aadb89d91b5" />


### Résultats

<img width="956" alt="image" src="https://github.com/user-attachments/assets/3fe08aaf-a0a3-430f-b818-3aadb89d91b5" />


### Interface administrateur (avant suppression)

<img width="958" alt="image" src="https://github.com/user-attachments/assets/41d5bf68-742f-4255-bacc-b5f79174156f" />


### Interface administrateur (après suppression)


<img width="959" alt="image" src="https://github.com/user-attachments/assets/52f5a96a-44d4-48c1-bb8c-5acd55562408" />

<img width="959" alt="image" src="https://github.com/user-attachments/assets/2a23bea3-a79f-40e4-992c-78f5901b0bf4" />


---

## 💻 Technologies utilisées

- **React** : Frontend pour l'interface utilisateur dynamique.
- **Node.js / Express** : Backend API pour gérer les calculs et les résultats.
- **RabbitMQ** : Système de gestion des files d'attente pour la gestion des tâches de calcul.
- **Docker** : Environnement de développement containerisé.
- **TailwindCSS** : Utilisé pour un design moderne et réactif.

---



## 📄 License

Ce projet est sous la licence MIT.

