#Use the official Node.js image
FROM node:16

#Set the Node environment to development
ENV NODE_ENV=development

#Create and changeto the app directory
WORKDIR /app

#Copy application dependency manifests to the container image.
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the local code to the container image.
COPY . .

#Expose the port the app runs on
EXPOSE 8080

#Run the application
CMD ["npm", "run", "dev"]