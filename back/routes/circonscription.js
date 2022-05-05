const circ = require("../services/geo/circonscriptions.json")

module.exports = {
    path: "/circonscription",
    config : (router) => {
        // Retourne les cironscriptions d'un département ou une circonscription précise en fonction des paramètres
        router.get("/", async (req, res, next) => {
            try {
                const { departement , circonscription } = req.query

                var data = circ.features

                if(departement)
                    data = data.filter(e => e.properties.code_dpt == departement)
                
                if(circonscription)
                    data = data.filter(e => e.properties.num_circ == circonscription)
                
                res.status(200).send({
                    type: "FeatureCollection",
                    features: data
                });
            } catch(err)
            {
                next(err)
            }
        })

        return router;
    }
};