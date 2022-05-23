const fetch = require("node-fetch")

async function send_(method, path, data) {
    const res = await fetch(path, {
        method: method,
        body: JSON.stringify(data),
    });

    const json = await res.json()

    return json
}

module.exports = {
    post : async (path, data) => {
        return await send_("POST", path, data);
    },
    get : async (path, data) => {
        return await send_("GET", path, data);
    },
    put : async (path, data) => {
        return await send_("PUT", path, data);
    },
    remove : async (path, data) => {
        return await send_("DELETE", path, data);
    }
}
