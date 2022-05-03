require('dotenv').config();
const morgan = require('morgan');

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUI = require('swagger-ui-express');
const errorHandler = require('./middlewares/errorHandler');

// Environnement de test
if(process.env.ENV == 'test')
{
    process.env.NODE_LOCAL_PORT = 3001;
    process.env.MYSQL_DATABASE += "_test";
}

//Swagger Configuration  
const swaggerOptions = {  
    swaggerDefinition: {  
        openapi: '3.0.1',
        info: {  
            title:'Projet PAL',  
            version:'1.0.0',
            description: "",
        }  
    },  
	apis: ["swagger.yaml", "./routes/*.js"]
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  

// Databases
require('./db/sequelize');

const app = express();

// log
// Pas de log pendant les test
if( ! process.env.ENV === 'test' ) {
	app.use(morgan('dev'));
}

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger
app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs)); 

// Routes
require("./routes")(app);

// Error handler middlewares
app.use(errorHandler);

const port = process.env.NODE_LOCAL_PORT || 3000;
app.listen(port, () => {
	console.log(`Worker: process ${process.pid} is up on port ${port}`);
});

module.exports = app;