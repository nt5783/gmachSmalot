import React from "react";
import { json } from "react-router-dom";

async function fetchfunc(url, method, body, thenfunc) {
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'content-Type': 'application/json; charset=UTF-8' },
        })
        const json = await response.json()
        const data = await json[0]
        if (!data){
            throw "data does'nt exist!"
        }
        return data;
    }
    catch (e) {
        return e
    }


}

async function fetchDeletefunc(url, thenfunc) {
    fetch(`http://localhost:8080/${url}`, {
        method: 'DELETE',
        headers: { 'content-Type': 'application/json; charset=UTF-8' },
    }).then((response) => response.JSON())
        .then((json) => {
            thenfunc(json)
        })
        .catch((err) => { })

}


export {
    fetchfunc, fetchDeletefunc
}