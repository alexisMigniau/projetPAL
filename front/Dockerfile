FROM node:16

WORKDIR /front 

COPY /front/package.json . 

RUN npm install 

EXPOSE 8080 

CMD ["npm", "run", "serve"]