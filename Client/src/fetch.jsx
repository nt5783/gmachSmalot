import React from "react"
import { json } from "react-router-dom"

async function loginfetchfunc(url, method, body, thenfunc) {
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'content-Type': 'application/json; charset=UTF-8' },
        })
        if (response) {
            const json = await response.json()
            const token = json.token
            document.cookie = `token=${token} ;path=/;`
            const data = await json
            const user = typeof data != 'undefined' ? data : null
            if (!data) {
                throw "data does'nt exist!"
            }
            return { status: response.status, data: user }
        }

    }
    catch (e) {
        return e
    }
}

async function fetchfunc(url, method, body, thenfunc) {
    const token = document.cookie;
    // console.log(token);
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'Authorization': `Bearer ${token}`, 'content-Type': 'application/json; charset=UTF-8' },
        })
        const json = await response.json()
        const data = await json
        const user = typeof data != 'undefined' ? data : null
        if (!data) {
            throw "data does'nt exist!"
        }
        return { status: response.status, data: user }
    }
    catch (e) {
        return e
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
        if (!data) {
            throw "data does'nt exist!"
        }
        return data;
    }
    catch (e) {
        return e
    }
}

export {
    fetchfunc, fetchNoParamsfunc, loginfetchfunc
}