const snakeCase = require("lodash/snakeCase");
const express = require("express");

// Import dynamique des routes
module.exports = (app) => {
    require("fs")
        .readdirSync(__dirname)
        .forEach((file) => {
            if (file === "index.js") return;
            const router = express.Router();
            const routeModule = require(require("path").join(__dirname, file));
            const path =
                routeModule.path ||
                "/" +
                    (file !== "root.js"
                        ? snakeCase(file.replace(".js", ""))
                        : "");
            const route = routeModule.config
                ? routeModule.config(router)
                : routeModule(router);

            // FOnctionnalité de middlewares globaux par route
            if(routeModule.middlewares)
                app.use(path, routeModule.middlewares,route);
            else
                app.use(path,route);
        });
};