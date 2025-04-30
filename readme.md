# 🧮 Projet Nuclear-Physics (projet2 branch)

Ce projet Node.js utilise **RabbitMQ** pour distribuer des opérations mathématiques (`add`, `sub`, `mul`, `div`, `all`) vers des workers spécialisés. L’opération `all` est une diffusion (`fanout`) vers **tous les workers**, tandis que les autres sont des routages directs.

## 🔧 Architecture

```mermaid
flowchart LR
    subgraph Producer
      P1(Producer)
    end

    subgraph Exchanges
      E1[calc_direct_exchange]
      E2[calc_fanout_exchange]
    end

    subgraph Queues
      Q1[add_queue]
      Q2[sub_queue]
      Q3[mul_queue]
      Q4[div_queue]
    end

    subgraph Workers
      W1[worker_add]
      W2[worker_sub]
      W3[worker_mul]
      W4[worker_div]
    end

    subgraph Result
      R[calc_results (Consumer)]
    end

    P1 -->|op=add| E1
    P1 -->|op=sub| E1
    P1 -->|op=mul| E1
    P1 -->|op=div| E1
    P1 -->|op=all| E2

    E1 -->|add| Q1 --> W1 --> R
    E1 -->|sub| Q2 --> W2 --> R
    E1 -->|mul| Q3 --> W3 --> R
    E1 -->|div| Q4 --> W4 --> R

    E2 --> Q1
    E2 --> Q2
    E2 --> Q3
    E2 --> Q4
```

## 🚀 Lancement

### Prérequis

- Docker & Docker Compose
- Node.js pour tests en local si besoin

### Variables d’environnement (.env)

```env
RABBITMQ_USER=user
RABBITMQ_PASS=password
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_URL=amqp://user:password@rabbitmq:5672
NODE_ENV=production
```

### Démarrage du projet

```bash
docker-compose up --build
```

Les messages seront produits toutes les 5 secondes automatiquement avec une opération aléatoire.

## 📦 Structure des messages

**Message envoyé par le producteur** :

```json
{
  "n1": 12,
  "n2": 6
}
```

**Message reçu par le consumer (exemple pour `add`)** :

```json
{
  "n1": 12,
  "n2": 6,
  "op": "add",
  "result": 18
}
```

**Message reçu par le consumer (exemple pour `all`)** :  
L'opération `all` envoie ce message à **tous les workers**, donc le consumer reçoit **4 résultats** différents :

```json
{ "n1": 8, "n2": 4, "op": "add", "result": 12 }
{ "n1": 8, "n2": 4, "op": "sub", "result": 4 }
{ "n1": 8, "n2": 4, "op": "mul", "result": 32 }
{ "n1": 8, "n2": 4, "op": "div", "result": 2 }
```

## 🛠 Workers

Chaque worker :
- Reçoit un message depuis sa queue
- Exécute le calcul après un délai aléatoire
- Renvoie le résultat au `consumer` via `calc_results`

## 🧪 Test Manuel

Tu peux modifier le `producer/index.js` pour tester une seule opération :

```js
const op = "add"; // remplace par "all" pour tous les workers
```

---

## 📬 Interface RabbitMQ

Accès via navigateur :
- URL : http://localhost:15672
- User : `user`
- Pass : `password`

---

## 📁 Structure du projet

```
.
├── consumer/
├── producer/
├── worker_add/
├── worker_sub/
├── worker_mul/
├── worker_div/
├── docker-compose.yml
└── .env
```

---

## 📖 Notes

- Le routage `direct` est utilisé pour les opérations individuelles.
- Le routage `fanout` diffuse le message à tous les workers pour `all`.
