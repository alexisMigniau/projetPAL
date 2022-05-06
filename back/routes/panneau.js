const { panneau: PanneauModel, Sequelize, sequelize } = require('../db/sequelize');
const requireField = require('../middlewares/requireField');
const { getCirconscriptions } = require('../services/geo/getCirconscriptions')
const { getAdresseFromGPS } = require('../services/api/gps');
const { Op } = require('sequelize');

module.exports = {
    path: "/panneau",
    config : (router) => {
        // Ajout de la position courante GPS
        // Latitude et Longitude en entrée
        router.post("/current", requireField({'latitude':'integer', 'longitude':'integer'}) ,async (req, res,next) => {
            try {
                const {latitude, longitude} = req.body
                // Récupéation des infos de département, circonscription et adresse de ce point gps
                const circ = getCirconscriptions(latitude, longitude)
                const adresse = await getAdresseFromGPS(latitude, longitude)
                if(circ && adresse)
                {
                    const newPanneau = await PanneauModel.create({ 
                        latitude: req.body.latitude, 
                        longitude: req.body.longitude, 
                        departement : circ.code_dpt, 
                        circonscription : circ.num_circ,
                        titre : adresse,
                        adresse : adresse
                    });
                
                    res.status(200).send(newPanneau);
                } else {
                    res.status(406).send("Ce point n'est dans aucune cironscription et/ou ne correspond à aucune adresse française");
                }
            } catch ( err ) {
                next(err);
            }
        });

        // Ajout de panneau a partir d'un fichier geoJSON
        router.post("/json", async (req, res,next) => {
            try {
                if(req.files.file)
                {
                    const content = req.files.file.data.toString('utf8');
                    const data = JSON.parse(content)
                    
                    await data.features.forEach(async p => {
                        const latitude = p.geometry.coordinates[1]
                        const longitude = p.geometry.coordinates[0]

                        const circ = getCirconscriptions(latitude, longitude)
                        const adresse = await getAdresseFromGPS(latitude, longitude)
                        
                        if(circ)
                        {
                            await PanneauModel.create({ 
                                latitude: latitude, 
                                longitude: longitude, 
                                departement : circ.code_dpt, 
                                circonscription : circ.num_circ,
                                titre : adresse,
                                adresse : adresse
                            });
                        }
                    });

                    res.sendStatus(200)
                } else {
                    res.status(400).send("Vous n'avez pas envoyer de fichier");
                }
            } catch ( err ) {
                next(err);
            }
        });

        // Route pour récupérer les points au format geoJSON selon les paramètres suivants :
        // latitude et longitude
        // Radius de recherche en kilomètre
        // Département et cironscriptions
        router.get("/", async (req, res, next) => {
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

                // Transformation des panneaux au format geoJSON
                const geoJSON = {
                    type :"FeatureCollection",
                    features:[]
                }
    
                panneaux.forEach(e => {
                    var data = e.dataValues
                    geoJSON.features.push({
                        type: "Feature",
                        geometry: {
                            "coordinates": [Number(data.longitude), Number(data.latitude)],
                            type: "Point"
                        }, 
                        properties: { 
                            departement : data.departement,
                            circonscription : data.circonscription,
                            marked : data.marked,
                            titre : data.titre
                        }
                    })
                })

                res.status(200).send(geoJSON);
            } catch(err)
            {
                next(err)
            }
        });

        return router;
    }
}