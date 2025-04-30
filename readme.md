# 🧠 Projet Nuclear-Physics

## 📘 Contexte

Ce projet a été réalisé dans le cadre d’une évaluation visant à simuler un **système de calcul distribué** pour le compte de l’Institut de Physique Nucléaire (NGI).

Le système s’appuie sur **RabbitMQ** pour assurer la communication entre différents composants :
- Producteurs de requêtes de calculs
- Workers spécialisés par opération mathématique
- Consommateur centralisant les résultats
- Une API REST + interface graphique dans les dernières versions

---

## 🎯 Objectifs pédagogiques

- Mettre en œuvre un système distribué basé sur les messages.
- Manipuler RabbitMQ, les échanges, les files et les bindings.
- Implémenter des microservices en Node.js.
- Gérer l’authentification, l’exposition d’une API REST et une interface React.

---

## 🔁 Vue d’ensemble des versions du projet

| Branche        | Fonctionnalités principales                                                                                                                                     |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `main`         | Version minimale du projet avec uniquement l’opération `add`                                                                                                   |
| `projet1`      | Ajout des opérations `add`, `sub`, `mul`, `div` – chaque worker est spécialisé                                                                                  |
| `projet2`      | Introduction du type d’opération `all`, qui permet d’envoyer la requête à **tous les workers**                                                                 |
| `api`          | Introduction d’une **API REST Express** avec les routes `POST /calc` et `GET /results` et consommation via RabbitMQ                                           |
| `front`        | Version finale : API complète, interface React, authentification admin, suppression des résultats via `DELETE /results`, et application conteneurisée (Docker) |

---

## 🔀 Changement de branche (Git)

**Avant chaque changement de branche faire un docker-compose down**

```bash
# Cloner le dépôt
git clone https://github.com/enstso/Nuclear-physics.git
cd nuclear-physics

# Liste des branches disponibles
git branch -r

# Exemple : passer à la branche projet2
git checkout projet2
```

---

## 🧪 Fonctionnement global

### ✅ Exemple de message envoyé par un producteur :

```json
{ "n1": 5, "n2": 3 }
```

### ✅ Réponse d’un worker (opération `add`) :

```json
{ "n1": 5, "n2": 3, "op": "add", "result": 8 }
```

---

## 📦 Déploiement & Test (toutes versions)

### 1. Créer le fichier `.env` (si nécessaire)

```bash
cp .env.example .env
```

### 2. Lancer tous les services

```bash
docker-compose up --build
```

### 3. Interface RabbitMQ

Accès à l'interface d'administration RabbitMQ :  
👉 http://localhost:15672  
- **User** : `user`
- **Password** : `password`

---

## 🧠 Schéma général (communication RabbitMQ)


 ```mermaid
 graph TD
     Producer -->|n1, n2| RabbitMQ1[calc_requests queue]
     RabbitMQ1 --> Worker
     Worker -->|n1, n2, op, result| RabbitMQ2[calc_results queue]
     RabbitMQ2 --> Consumer
 ```

---

## 🧩 Fonctionnalités par branche

### 🌱 `main`
- Producteur aléatoire (n1, n2)
- Un seul worker (add)
- Un consumer qui lit les résultats
- Échange de base (1 file de requête, 1 file de réponse)

### ➕ `projet1`
- Workers spécialisés `add`, `sub`, `mul`, `div`
- Producteur qui choisit aléatoirement une des 4 opérations
- Utilisation d’un **échange direct**

### 🌐 `projet2`
- Ajout de l’opération `all`
- Introduction d’un **échange fanout** pour la requête "toutes les opérations"
- Tous les workers reçoivent une requête de type `all`

### ⚙️ `api`
- Ajout d’une API Express
  - `POST /calc` pour soumettre une opération (via RabbitMQ)
  - `GET /results` pour consulter les résultats collectés
- Un **consumer Express** qui lit les résultats et les stocke temporairement en mémoire
- Pas encore de frontend

### 🖥️ `front` (version finale)
- Interface web en React (port 5173)
- Intégration complète avec l'API :
  - Envoi de calculs
  - Affichage des résultats en direct
- Interface admin (auth : `admin`/`adminpassword`)
  - Suppression de tous les résultats (`DELETE /results`)
- Lancement :
  ```bash
  cd front
  npm install
  npm run dev
  ```



