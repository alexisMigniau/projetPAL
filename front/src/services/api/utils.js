async function send_(method, path, data, sendFile = false) {
    let content = {
        method: method,
        headers: {
            "Content-Type": !sendFile ? "application/json" : "multipart/form-data"
        },
        body: !sendFile ? JSON.stringify(data) : data
    }

    return await fetch(path, content);
}

export async function post(path, data, sendFile = false) {
    return await send_("POST", path, data, sendFile);
}

export async function get(path, data) {
    return await send_("GET", path, data);
}

export async function remove(path, data) {
    return await send_("DELETE", path, data);
}

export async function put(path, data) {
    return await send_("PUT", path, data);
}
