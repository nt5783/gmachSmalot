// import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";

function About() {
    return(<>
        <h2>גמ"ח שמלות נווה יעקב</h2>
        <p>הגמ"ח מחזיק מאות שמלות במידות ילדות נערות ונשים</p>
        <h3>דרכי הגעה:</h3>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.2926398087297!2d35.24511695812035!3d31.84425110043901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15032a58c18df151%3A0xf931c6d2c527d657!2z15HXqNeV15og16bXlden16jXntefLCDXmdeo15XXqdec15nXnQ!5e0!3m2!1siw!2sil!4v1716902537182!5m2!1siw!2sil" 
         style={{height:450 ,width:600,  border:0}} allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </>)
}

export default About