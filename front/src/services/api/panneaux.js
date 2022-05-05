import { get } from "./utils.js"

export async function getAllPanneaux()
{
    return await get("/panneau")
}