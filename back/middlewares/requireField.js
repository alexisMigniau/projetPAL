const sequelize = require('sequelize');

/* required_field est un objet ou chaque clé est un champs requis dans la requête et la valeur est le nom du type de la valeur attendu dans la requête */
module.exports = ( required_field ) => {
	return function (req, res, next) {
		for(let [field_name, field_type] of Object.entries(required_field) ) {
			if( req.body[ field_name ] === undefined ) {
				return res.status( 406 ).send({ field: field_name, type: field_type });
			} else {
				let valid = true;
				switch( field_type ) {
					case 'integer': if( isNaN( req.body[ field_name ] ) ) valid = false; break;
					case 'boolean': if(	typeof req.body[ field_name] != 'boolean' ) valid = false; break;
					case 'string': valid = true; break;
					default: valid = true;
				}
				if( ! valid ) {
					return res.status( 406 ).send({ field: field_name, type: field_type });
				}
			}
		}
		next();
	};
}

/* Template pour la documentation swagger des routes utilisant ce middleware : 

        *        "406":
        *          description: "Not acceptable due to a parameter"
        *          content:
        *            application/json:
        *              schema:
        *                type: "object"
        *                properties :
        *                   field :
        *                       type : string
        *                       enum : ['username','password']
        *                   type :
        *                       type : string
        *                       enum : ['integer','string','boolean']

*/