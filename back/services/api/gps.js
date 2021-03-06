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

module.exports.getGPSFromAdresse = async function(adresse)
{
    try{
        const res = await get(`https://api-adresse.data.gouv.fr/search/?q=${adresse}`);

        return {
            latitude : res.features[0].geometry.coordinates[1],
            longitude : res.features[0].geometry.coordinates[0]
        }
    } catch(error)
    {
        return false;
    }
}

module.exports.getPathForPoint = async function(panneaux)
{
    const TOKEN = "780c9b9de5699f"

    try{
        const res = await get(`https://eu1.locationiq.com/v1/optimize/driving/${panneaux.join(";")}?key=${TOKEN}&geometries=geojson`);

        return res;
    } catch(error)
    {
        return false;
    }
}