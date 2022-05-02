const { panneau: PanneauModel, Sequelize, sequelize } = require('../db/sequelize');

module.exports = {
    path: "/panneau",
    config : (router) => {
        /**
        *   @openapi
        *   /formation/search:
        *    get:
        *      security:
        *      - token: []
        *      tags:
        *      - "Course"
        *      summary: "Search formation"
        *      parameters:
        *      - in: query
        *        name : "name"
        *        schema:
        *           type: string
        *        example: math
        *      responses:
        *        "200":
        *          description: "Success"
        *          content:
        *            application/json:
        *             schema:
        *                type: "array"
        *                items:
        *                   type: "object"
        *                   properties:
        *                      name:
        *                         type: "string"
        *                         example: "mathematics"
        *                      id:
        *                         type: "int"
        *                         example: 1
        *        "401":
        *           description: "Bad request"
        *        "404":
        *           description: "Not Found"
        *        "500":
        *          description: "Internal server error"
        */

        // Fonction de recherche des formation, un seul paramètre est possible qui est le nom de la formation (attribut tag dans course bundle)
        // Si aucun paramètre n'est envoyée, toutes les formations sont retournées
        // Cette fonction retourne une liste de toutes les correspondances trouvée
        // Accessible seulement par l'administrateur
        router.get("/search", rights.isAdmin ,async (req, res,next) => {
            try {
                
                    if( req.query.name ) {
                        const result = await FormationModel.findAll({
                            include : { model: CourseBundleModel ,
                                        where : { tag : { [Op.like] :`%${req.query.name}%` } } } });
                                        
                        res.status(200).send(result.map(f => ({id : f.course_bundle.id , name : f.course_bundle.tag})));   
                    } else {
                        const result = await FormationModel.findAll({include: CourseBundleModel});
                        res.status(200).send(result.map(f => ({id : f.course_bundle.id , name : f.course_bundle.tag})));
                    }
                } catch( err ) {
                    next(err);
                }
        });

        return router;
    }
}