const { get } = require('./utils')

module.exports.getAdresseFromGPS = async function(latitude, longitude)
{
    const res = await get(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`);
    
    if(res.features.length == 0)
    {
        return false;
    } else {
        return res.features[0].properties.label
    }
}