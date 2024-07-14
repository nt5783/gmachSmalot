import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext, DateContext } from "../App";
import Calendar from 'react-calendar';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function InvitationCalendar() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const { user } = useContext(UserContext);
  const { date, setDate } = useContext(DateContext);
  let eventDate = new Date(date);

  useEffect(() => {
    console.log('date');
    console.log(date);
  }, [date]);

  function onChange(nextValue) {
    setValue(nextValue);
  }

  function handleClickDay(value) {
    user
      ? localStorage.setItem(`date${user.username}`, JSON.stringify(value))
      : localStorage.setItem(`date`, JSON.stringify(value));
    setDate(value);
    navigate('/models');
  }

  function clearDate() {
    user && localStorage.getItem(`date${user.username}`)
      ? localStorage.removeItem(`date${user.username}`)
      : localStorage.removeItem('date');
    setDate(null);
  }

  var oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  return (
    <>
      {date && (
        <Message
          severity="info"
          text={`You have the date ${eventDate.getDate()}/${eventDate.getMonth() + 1}/${eventDate.getFullYear()} picked.`}
          className="date-message"
        />
      )}
      {date && (
        <Button className="p-button-secondary p-button-text clear-date-button" label="Pick a new date" onClick={clearDate} />
      )}
      {!date && (
        <div className="calendar-container">
          <Card className="calendar-card" header="Select the date of your event">
            <Calendar
              maxDate={oneYearFromNow}
              minDate={new Date()}
              minDetail="year"
              calendarType="hebrew"
              next2Label={null}
              prev2Label={null}
              onClickDay={handleClickDay}
              onChange={onChange}
              tileDisabled={({ date }) => date.getDay() === 6 || date.getDay() === 5}
              value={value}
            />
          </Card>
        </div>
      )}
    </>
  );
}

export default InvitationCalendar;
