# 🧠 Projet Nuclear-Physics (main branch)

## 📝 Description

Ce projet a été réalisé dans le cadre d'une évaluation de mise en œuvre d’un système de calcul distribué. Le système utilise **RabbitMQ** comme broker de messages pour permettre la communication entre plusieurs entités :

- **Producer** : envoie périodiquement des requêtes de calcul aléatoires.
- **Worker** : traite les requêtes (avec une latence simulée de 5 à 15 secondes) et retourne les résultats.
- **Consumer** : lit les résultats des calculs et les affiche.

Les messages sont échangés au format JSON via des files RabbitMQ. L’objectif est de simuler des calculs complexes de manière distribuée.

---

## 🔧 Technologies utilisées

| Technologie       | Rôle                                                                 |
|-------------------|----------------------------------------------------------------------|
| Node.js           | Langage de programmation pour le Producer, Worker, et Consumer       |
| RabbitMQ          | Broker de messages (AMQP) pour la distribution des tâches            |
| Docker & Docker Compose | Conteneurisation des services pour un déploiement simplifié      |
| `amqplib`         | Bibliothèque Node.js pour communiquer avec RabbitMQ via AMQP         |
| `wait-for-it.sh`  | Script pour s'assurer que RabbitMQ est prêt avant de démarrer les services Node.js |

### 🎯 Pourquoi ces choix ?

- **Node.js** : Léger, rapide à développer, excellent pour les opérations I/O et les microservices.
- **RabbitMQ** : Robuste et standardisé pour les communications inter-processus asynchrones via le protocole AMQP.
- **Docker** : Assure la portabilité et l’isolation de l’environnement pour faciliter la configuration et l’exécution du projet.

---

## 🗂️ Structure du projet

```
.
├── consumer/
│   └── index.js
├── worker/
│   └── index.js
├── producer/
│   └── index.js
├── docker-compose.yml
├── .env.example
├── wait-for-it.sh
└── README.md
```

---

## 📦 Installation & Lancement

### 1. Pré-requis

- Docker & Docker Compose
- Node.js (si vous exécutez les scripts hors Docker)

### 2. Configuration

Créer un fichier `.env` à partir de `.env.example` :

```env
RABBITMQ_USER=user
RABBITMQ_PASS=password
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_URL=amqp://user:password@rabbitmq:5672
NODE_ENV=production
```

### 3. Lancer le projet

```bash
docker-compose up --build
```

### 4. Accéder à l’interface de gestion RabbitMQ

Ouvrir un navigateur à l'adresse : [http://localhost:15672](http://localhost:15672)

Login : `user`  
Mot de passe : `password`

---

## 🧪 Tests & Résultats

- Toutes les **5 secondes**, le producer envoie une paire `{ n1, n2 }`.
- Un **worker** récupère la requête, attend entre 5 et 15 secondes, puis renvoie le résultat de la somme.
- Le **consumer** affiche à l’écran les résultats reçus.

---

## 📊 Schéma de communication

```mermaid
graph TD
    Producer -->|n1, n2| RabbitMQ1[calc_requests queue]
    RabbitMQ1 --> Worker
    Worker -->|n1, n2, op, result| RabbitMQ2[calc_results queue]
    RabbitMQ2 --> Consumer
```

---

## ✅ Exemple de messages

**Message envoyé par le producer :**
```json
{ "n1": 12, "n2": 8 }
```

**Message renvoyé par le worker :**
```json
{ "n1": 12, "n2": 8, "op": "add", "result": 20 }
```
