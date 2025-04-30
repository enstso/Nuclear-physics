# Utilise l'image officielle de Node.js (version alpine pour une image plus légère)
FROM node:22-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Télécharge wait-for-it.sh et rends-le exécutable
RUN apk --no-cache add bash && \
    wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it && \
    chmod +x /usr/local/bin/wait-for-it

# Copie les fichiers package.json et package-lock.json (ou npm-shrinkwrap.json)
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie tout le code source dans le conteneur
COPY . .

# Expose le port sur lequel l'app Node.js va tourner
EXPOSE 3000

# Utilise wait-for-it pour attendre que RabbitMQ soit prêt avant de démarrer l'app
CMD ["wait-for-it", "rabbitmq:5672", "--", "node", "index.js"]