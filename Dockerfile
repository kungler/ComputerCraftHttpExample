# Utilisez une image Node.js officielle en tant que base pour notre image Docker
FROM node:14

# Définissez le répertoire de travail pour notre application
 # WORKDIR /app# 
COPY . .
# RUN cd /app #

# Installez les dépendances de votre application
RUN npm install

# Définissez l'exposition du port pour notre application
EXPOSE 1337
EXPOSE 8080

# Définissez le script d'entrée pour démarrer votre application
ENTRYPOINT ["npm", "run","start"]
