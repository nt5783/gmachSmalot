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
        throw(e)
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
        if (response.status == 401){
            throw('Permission is denied\n' + data.message)
        }
        //מה קוראים לזה user
        const user = typeof data != 'undefined' ? data : null
        // לא תמיד מקבל דטה
        // if (!data) {
        //     throw "data does'nt exist!"
        // }
        return { status: response.status, data: user }
    }
    catch (e) {
        // throw(e)
        alert(e)
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
        if (response.status == 401){
            alert('Permission is denied\n' + data.message)
        }
        // if(!response.ok)
        //     throw response
        if (!response.ok)
            throw 'Error' + response.status + ': ' + response.statusText;
        console.log(response)
        if (!data) {
            throw "data does'nt exist!"
        }
        return data;
    }
    catch (e) {
              // throw(e)
              alert(e)
    }
}

export {
    fetchfunc, fetchNoParamsfunc, loginfetchfunc
}