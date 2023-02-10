# Utilisez une image Node.js officielle en tant que base pour notre image Docker
FROM node:14

# Définissez le répertoire de travail pour notre application
WORKDIR /app

# Copiez les fichiers de votre application depuis votre répertoire local vers le répertoire de travail de Docker
COPY . .

# Installez les dépendances de votre application
RUN npm install

# Définissez l'exposition du port pour notre application
EXPOSE 1337

# Définissez le script d'entrée pour démarrer votre application
CMD [ "node", "index.js" ]