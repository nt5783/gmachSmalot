import React, {useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function InvitationCalendar() {
    const navigate = useNavigate();
    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
      setValue(nextValue);
    }
    
    return (
        <div style={{margin:"300px"}}>
                <Calendar calendarType='hebrew'
                onClickDay={(value)=>navigate('/gowns', { state: { value } })}
                // onClickDay={(value, event) => alert('Clicked day: ', value)}
        onChange={onChange}
        value={value}
      />  
        </div>

    );
}
export default InvitationCalendar;




// import React, {useState, useEffect, useContext } from 'react';
// import { useNavigate,useLocation } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// // import { AppContext } from "../App";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function Gowns() {
//   const { state } = useLocation();
//     // const [value, setValue] = useState(new Date());
//     const { value } = state;
//     // function onChange(nextValue) {
//     //   setValue(nextValue);
//     // }
//   console.log(value)
//     return (
//       // <Calendar
//       //   onChange={onChange}
//       //   value={value}
//       // />
//       <p>
//         gowns!!!!!!!!
//       </p>
//     );
// }
// export default Gowns;