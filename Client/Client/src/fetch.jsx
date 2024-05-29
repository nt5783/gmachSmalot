import React from "react";
import { json } from "react-router-dom";

function fetchfunc(url, method, body, headers, thenfunc){
    fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers,
    }).then((response) => response.JSON())
    .then((json)=>{
        thenfunc(json)
    })
    .catch((err) => {})
        
    
}

export{
    fetchfunc
}