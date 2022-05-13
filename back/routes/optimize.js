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

                var whereData = {
                    marked : false
                }
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
                const arrayPanneaux = [`${longitude},${latitude}`]
                
                panneaux.forEach(e => {
                    var data = e.dataValues
                    arrayPanneaux.push(`${data.longitude},${data.latitude}`)
                })

                const path = await getPathForPoint(arrayPanneaux)

                // Export des panneaux au format geoJSON
                var point = []

                for(i = 0; i < path.waypoints.length; i++)
                {
                    var w = path.waypoints[i]
                    if(w.waypoint_index != 0)
                    {
                        // Recherche du panneau par rapport à la position
                        const p = await PanneauModel.findOne({
                            order : sequelize.literal("6371 * acos(cos(radians("+w.location[1]+")) * cos(radians(latitude)) * cos(radians("+w.location[0]+") - radians(longitude)) + sin(radians("+w.location[1]+")) * sin(radians(latitude))) ASC")
                        })

                        point.push({
                            type: "Feature",
                            geometry: {
                                "coordinates": [Number(p.dataValues.longitude), Number(p.dataValues.latitude)],
                                type: "Point"
                            }, 
                            properties: {
                                id : p.dataValues.id,
                                departement : p.dataValues.departement,
                                circonscription : p.dataValues.circonscription,
                                marked : p.dataValues.marked,
                                titre : p.dataValues.titre,
                                ordre : w.waypoint_index,
                            }
                        })
                    }
                }

                // Export du chemin au format geoJSON
                const geoJSON = path.trips[0]
                geoJSON.type = "Feature"
                geoJSON.properties = {}


                res.status(200).send({
                    path : geoJSON,
                    point : {
                        type :"FeatureCollection",
                        features : point
                    }
                });
            } catch(err)
            {
                next(err)
            }
        });

        return router;
    }
};