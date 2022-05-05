import { get } from "./utils.js"

export async function getCirconscriptions(departement = null)
{
    return await get(`/circonscription?departement=${departement}`)
}