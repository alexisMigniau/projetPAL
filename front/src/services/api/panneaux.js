import { get, post, put } from "./utils.js"

async function getPanneaux(departement, circonscriptions)
{
    return await get(`/panneau?departement=${departement}&circonscription=${circonscriptions}`)
}

async function addPanneauWithGPS(latitude, longitude)
{
    return await post('/panneau/current', {
        latitude : latitude,
        longitude : longitude
    })
}

async function addPanneauWithAdresse(adresse)
{
    return await post('/panneau/adresse', {
        adresse : adresse
    })
}

async function addPanneauWithFile(formData)
{
    return await post('/panneau/json', {
        "file": formData
    }, true)
}

async function updatePanneau(id, marked)
{
    return await put(`/panneau/${id}/${marked}`)
}

async function getOptimizedPath(latitude, longitude, radius, departement, circonscription)
{
    return await get(`/optimize?latitude=${latitude}&longitude=${longitude}&radius=${radius}&departement=${departement}&circonscription=${circonscription}`)
}

export {
    getOptimizedPath,
    getPanneaux,
    addPanneauWithAdresse,
    addPanneauWithGPS,
    addPanneauWithFile,
    updatePanneau
}