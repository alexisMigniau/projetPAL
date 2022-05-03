const { panneau: PanneauModel, Sequelize, sequelize } = require('../db/sequelize');
const requireField = require('../middlewares/requireField');
const { getCirconscriptions } = require('../services/geo/getCirconscriptions')
const { getAdresseFromGPS } = require('../services/api/gps')

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

        return router;
    }
}