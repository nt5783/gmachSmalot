
async function loginfetchfunc(url, method, body) {
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'content-Type': 'application/json; charset=UTF-8' },
        })
        if (!response.ok)
            throw { status: response.status, message: response.statusText };
        if (response) {
            const json = await response.json()
            const token = json.token
            document.cookie = `token=${token} ;path=/;`
            const data = await json
            const user = typeof data != 'undefined' ? data : null
            return { status: response.status, data: user }
        }
    }
    catch (err) {
        throw (err)
    }
}

async function fetchfunc(url, method, body) {
    const token = document.cookie;
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'Authorization': `Bearer ${token}`, 'content-Type': 'application/json; charset=UTF-8' },
        })
        const json = await response.json()
        const data = await json
        if (!response.ok)
            throw { status: response.status, message: response.statusText };
        return { status: response.status, data: data ?? null }
    }
    catch (err) {
        if (!err.hasOwnProperty('status'))
            return;
        else if (err.status == 401)
            alert('Permission is denied\n' + err.message)
        else
            throw (err)
    }
}

async function fetchNoParamsfunc(url, method) {
    const token = document.cookie;
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: method,
            headers: { 'Authorization': `Bearer ${token}`, 'content-Type': 'application/json; charset=UTF-8' },
        })
        const data = await response.json()
        if (!response.ok)
            throw { status: response.status, message: response.statusText };
        return data;
    }
    catch (err) {
        if (!err.hasOwnProperty('status'))
            return;
        else if (err.status == 401)
            alert('Permission is denied\n' + err.message)
        else
            throw (err)
    }
}

export {
    fetchfunc, fetchNoParamsfunc, loginfetchfunc
}