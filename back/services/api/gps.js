const { get } = require('./utils')

module.exports.getAdresseFromGPS = async function(latitude, longitude)
{
    try{
        const res = await get(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`);
    
        return res.features[0].properties.label    
    } catch(error)
    {
        return false;
    }
}