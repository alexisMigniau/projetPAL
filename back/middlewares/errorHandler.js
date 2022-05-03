const sequelize = require('sequelize');

module.exports = (err, req, res, next) => {
    console.warn(err)

    if(err instanceof sequelize.UniqueConstraintError)
    {
        const itemError = err.errors[0];
        res.status(409).send({field : itemError.path, type : itemError.type});
    } else if(err instanceof sequelize.ValidationError)
    {
        const itemError = err.errors[0];
        res.status(400).send({field : itemError.path, type : itemError.type});
    }
    else{
        res.sendStatus(500);
    }
};