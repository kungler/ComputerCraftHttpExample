# Utilisez une image Node.js officielle en tant que base pour notre image Docker
FROM node:14

# Définissez le répertoire de travail pour notre application
VOLUME /app

# Installez les dépendances de votre application
RUN npm install

# Définissez l'exposition du port pour notre application
EXPOSE 1337

# Définissez le script d'entrée pour démarrer votre application
ENTRYPOINT ["node", "index.js"]