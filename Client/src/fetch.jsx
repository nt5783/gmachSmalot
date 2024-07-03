import React from "react";
import { json } from "react-router-dom";
// import {Cookies} from 'react-cookie'

async function fetchfunc(url, method, body, thenfunc) {
    const allCookies = document.cookie;
    console.log(allCookies);
    const token = document.cookie;
    console.log(token);
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'Authorization': `Bearer ${token}`,'content-Type': 'application/json; charset=UTF-8' },
            // credentials: 'same-origin'
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

async function loginfetchfunc(url, method, body, thenfunc) {
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'content-Type': 'application/json; charset=UTF-8' },
        })
        if (response) {
            const json = await response.json()
            const token2 = json.token
            console.log('token2')
            console.log(token2) // :)
            // const cookie = new Cookies()
            document.cookie = `token=${token2} ;path=/;`
            /////////////i'm in the middle here!!!!!!!!!!!!

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

const fetchImg = async (model) => {
    // const response = await fetch(`http://localhost:8080/models/${model}`, {method: "GET"});
    const response = await fetch(`http://localhost:8080/imgs/${model}`, { method: "GET" });
    const data = await response.json();
    // const [user] = data.results;
    return data.blob()
};

async function fetchNoParamsfunc(url, method) {
    //     fetch(`http://localhost:8080/${url}`, {
    //         method: method,
    //         headers: { 'content-Type': 'application/json; charset=UTF-8' },
    //     }).then((response) => response.JSON())
    //         .then((json) => {
    //             thenfunc(json)
    //         })
    //         .catch((err) => { })

    // }
    // try {
    const response = await fetch(`http://localhost:8080/${url}`, {
        method: method,
        headers: { 'content-Type': 'application/json; charset=UTF-8' },
    })
    const data = await response.json()
    // const gowns = data.results
    // setGowns(data)
    // console.log("data")
    // console.log(data)
    // console.log("gowns")
    // console.log(gowns)
    if (!data) {
        throw "data does'nt exist!"
    }
    return data;
    // }
    // catch (e) {
    //     return e
    // }
}




export {
    fetchfunc, fetchNoParamsfunc, fetchImg, loginfetchfunc
}