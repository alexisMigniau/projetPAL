FROM node:16

WORKDIR /back

COPY /back/package.json .

RUN npm install

COPY /back .

EXPOSE 3000

# Utilisation de wait-for-it pour attendre que Mysql soit prêt à recevoir des commandes
RUN git clone https://github.com/vishnubob/wait-for-it.git /etc/wait
RUN chmod +x /etc/wait/wait-for-it.sh

CMD ["/etc/wait/wait-for-it.sh", "mysqldb:3306", "-t", "60", "--", "npm", "run", "dev"]
