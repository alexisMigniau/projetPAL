const { panneau: PanneauModel, Sequelize, sequelize } = require('../db/sequelize');
const { Op } = require('sequelize');
const { getPathForPoint } = require('../services/api/gps');

module.exports = {
    path: "/optimize",
    config : (router) => {

        // Calcul de la route optimal pour les positions suivantes
        router.get('/', async(req, res, next) => {
            try {

                const { latitude, longitude, radius, departement, circonscription } = req.query

                var whereData = {}
                var panneaux = {};

                // Recherche par département, et par circonscription si le paramètre est fournit
                if(departement) whereData.departement = departement;
                if(circonscription) whereData.circonscription = circonscription;

                // Recherche par radius autour d'une position
                if(latitude && longitude && radius)
                {
                    panneaux = await PanneauModel.findAll({
                        attributes : {
                            include : [
                                [sequelize.literal("6371 * acos(cos(radians("+latitude+")) * cos(radians(latitude)) * cos(radians("+longitude+") - radians(longitude)) + sin(radians("+latitude+")) * sin(radians(latitude)))"), 'distance']
                            ]
                        },
                        where : [
                            sequelize.where(sequelize.literal("6371 * acos(cos(radians("+latitude+")) * cos(radians(latitude)) * cos(radians("+longitude+") - radians(longitude)) + sin(radians("+latitude+")) * sin(radians(latitude)))"), {
                                [Op.lte] : radius
                            }),
                            whereData
                        ]
                    })
                } else {
                    panneaux = await PanneauModel.findAll({
                        where : whereData
                    })
                }

                // Transformation des panneaux en liste de position GPS
                const arrayPanneaux = []
                
                panneaux.forEach(e => {
                    var data = e.dataValues
                    arrayPanneaux.push(`${data.longitude},${data.latitude}`)
                })

                const path = await getPathForPoint(arrayPanneaux)
                const geoJSON = path.trips[0]
                geoJSON.type = "Feature"
                geoJSON.properties = {}
                res.status(200).send(geoJSON);
            } catch(err)
            {
                next(err)
            }
        });

        return router;
    }
};