async function send_(method, path, data) {
    let headers = {
        "Content-Type": "application/json",
    };
    if (localStorage.getItem("vuex")) {
        headers.Authorization =
            "Bearer " + JSON.parse(localStorage.getItem("vuex")).authentication;
    }
    return await fetch(path, {
        method: method,
        headers,
        body: JSON.stringify(data),
    });
}

export async function post(path, data) {
    return await send_("POST", path, data);
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
