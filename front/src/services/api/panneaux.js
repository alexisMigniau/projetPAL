import { get } from "./utils.js"

export async function getPanneaux(departement, circonscriptions)
{
    return await get(`/panneau?departement=${departement}&circonscription=${circonscriptions}`)
}