# gmachSmalot
end to end project - gowns gemach



להפוך put ל patch
להחליט שכל הגט יהיו ברבים עם S
שהמנהל יוכל לראות את כל ההזמנות הקיימות לדגם מסויים


יום אחרי עד 1 בצהריים
לפי ימי עסקים
פתוח במוצש רק בחורף


passwords(google)

manager- delete: model, gown, update: gown,(model) , add: model, gown, props

ביטול הזמנה

payment
access token - cookies לפני ביצוע פעולות מנהל לבדוק (בAPP) שהתוקן תקין

filters & search
to style
סדר בקוד סדר באתר (עברית אנגלית לדוגמה)
responivity
לסדר את הQUERYS
שיעשה נכון טיפול בשגיאות, בלקוח ובשרת
אם מוסיף מודל קיים?
אם מוסיף שמלה קיימת? שיוסיף כמות?
להסתכל על בסיס הנתונים


done:
about: to fill
login: users
signup
cart
gowns			לפי תאריך

we add sizeId in gowns what about models?

#ffcc99
#e699ff
#99ffff
#ffffff



שאילתות
SELECT model,womenImage,girlsImage,color,season FROM models NATURAL JOIN colors NATURAL JOIN seasons WHERE model = 610;
SELECT gownId,model,amount,size,length FROM gowns NATURAL JOIN sizes NATURAL JOIN lengths WHERE gownId = 316

WHERE date BETWEEN ‘YYYY-MM-DD’ AND ‘YYYY-MM-DD’;

UPDATE `gmachsmalot`.`models` SET `color` = 'blue' WHERE (`model` = '888');

UPDATE models SET color= 'black' WHERE model = '222'

/* V שמלות תפוסות בתאריך*/
select *
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09';

/* V שמלות שכל הכמות שלהן תפוסה בתאריך*/

/*select *,COUNT(*) as QuantityOccupied
from gowns g JOIN orders o
where g.id=o.gownId and eventDate='2024-08-09' and QuantityOccupied=g.amount
group by gownId;*/

select *
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X
where QuantityOccupied=x.amount;

/*כמות פנויה מהשמלות התפוסות*/
select * , X.amount - QuantityOccupied as available
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X

/*שמלות פנויות בתאריך*/
select *
from gowns g1
where g1.gownId not in (select X.gownId
from(
select *,COUNT(*) as QuantityOccupied
from gowns g2 NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X
where QuantityOccupied=x.amount);


/*כולל כמות שמלות פנויות בתאריך*/
/*select *, amount as available
from gowns g1
union*/

select gownId, model, size, length, amount, X.amount - QuantityOccupied as available
from gowns g1 NATURAL LEFT OUTER JOIN
(select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X ;


/*select *
from gowns g1
where g1.gownId <> (select X.gownId
from(
select *,COUNT(*) as QuantityOccupied
from gowns g2 NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X
where QuantityOccupied=x.amount);


select gownId , X.amount - QuantityOccupied as available
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X*/


/*שמלות פנויות מהשמלות התפוסות */
select *
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X
where QuantityOccupied < X.amount;

/* בודק שמודל בשימוש? */
/* V מודלים פנויים בתאריך */
/*select model
from gowns
EXCEPT 
select X.model
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X
where QuantityOccupied=X.amount;*/

select distinct model
from gowns NATURAL JOIN models
where isInUse=1 and gownId not in (select OG.gownId
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) OG
where QuantityOccupied=OG.amount);

/*V ובימים שמסביב  מודלים פנויים בתאריך */

select distinct model
select distinct model,color,season,womenImage,girlsImage
from gowns NATURAL JOIN models NATURAL JOIN colors NATURAL JOIN seasons
where isInUse=1 and gownId not in (select OG.gownId
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate BETWEEN '2024-08-07' AND '2024-08-11'
group by gownId) OG
where QuantityOccupied=OG.amount);

select gownId, model, size, length, amount, size-amount
from gowns

WHERE date BETWEEN ‘YYYY-MM-DD’ AND ‘YYYY-MM-DD’;





OLD STYLE:
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

nav {
  background-color: rgb(224, 214, 239);
  padding: 15px;
  display: flex;
  /* justify-content: space-around; */
  justify-content: center;
  /* justify-content: space-between; */
  /* margin: 80px 0px; */
}

.models_container______________----------------- {
  /* background-color: rgb(241, 229, 252); */
  /* width: 100%; */
  display: grid;
  grid-gap: 60px;
  /* grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto auto auto; */
  grid-template-columns: 350px 350px 350px ;
  /* grid-template-rows: 500px 500px; */
  justify-content: center;
  /* align-items:center; */
  margin: 100px;
}

.model_item__________-----------{
  background-color:rgb(241, 229, 252);
  /* background-color:rgb(107, 0, 206); */
  padding: 10;
  border-radius: 20px;
}

/* .number_without, input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
} */

 /* input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button, .number_without{
  -webkit-appearance: none;
  margin: 0;
}

#amount, input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: default-button;
} */
































:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.background-animation {
  width: 100%;
  height: 100vh;
  background-size: cover;
  animation: backgroundAnimation 10s infinite alternate;
  /* Adjust timing as needed */
}

/* @keyframes backgroundAnimation {
  0% {
    background-image: url('img/001.jpg');
  }

  30% {
    background-image: url('img/002.jpg');
  }

  60% {
    background-image: url('img/005.webp');
  }

  100% {
    background-image: url('img/004.jpg');
  }
} */

/* a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
} */

a {
  /* border-radius: 8px; */
  /* border: 1px solid transparent; */
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: rgb(145, 127, 173);
  cursor: pointer;
  /* margin: 3px; */
  margin: 20px 10px;
  color: #000000;
  text-decoration: inherit;
}

.home_navigate {
  display: block;
  height: 50px;
  margin-top: 30px;
}

/* .no_background {
  background: none;
  padding: 0px;
  margin: 0px;
}

.no_background:hover {
  padding: 0px;
  margin: 0px;
  background: none;
} */

a:hover {
  border-color: rgb(0, 0, 0);
  background-color: rgb(208, 195, 228);
}

body {
  margin: 0;
  display: flex;
  /* place-items: center; */
  min-width: 320px;
  min-height: 100vh;
  /* background-color: rgb(75, 75, 75); */
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }

  a:hover {
    color: #747bff;
  }

  button {
    background-color: #f9f9f9;
  }
}





/* Wrapper for the calendar */
.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  padding: 20px;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

/* Calendar header styling */
.react-calendar__navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.react-calendar__navigation button {
  color: #007bff;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  outline: none;
}

.react-calendar__navigation button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

/* Styling for weekdays */
.react-calendar__month-view__weekdays {
  background-color: #f5f5f5;
  text-transform: uppercase;
  font-size: 12px;
}

.react-calendar__month-view__weekdays__weekday {
  padding: 10px;
  font-weight: bold;
  color: #333;
}

/* Styling for the days */
.react-calendar__tile {
  padding: 15px;
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.react-calendar__tile:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.react-calendar__tile--now {
  background: #007bff;
  color: #fff;
  border-radius: 50%;
}

.react-calendar__tile--active {
  background: #28a745;
  color: #fff;
  border-radius: 50%;
}

.react-calendar__tile--hasActive {
  background: #17a2b8;
  color: #fff;
  border-radius: 50%;
}

/* Hover and focus states */
.react-calendar__tile:hover,
.react-calendar__tile:focus {
  background: #007bff;
  color: #fff;
  border-radius: 50%;
}

/* Calendar button styling */
.react-calendar__navigation__label__labelText,
.react-calendar__navigation__arrow {
  font-size: 18px;
  color: #333;
}

/* Next and previous buttons styling */
.react-calendar__navigation__prev-button,
.react-calendar__navigation__next-button {
  font-size: 18px;
  color: #007bff;
}

.react-calendar__navigation__prev-button:disabled,
.react-calendar__navigation__next-button:disabled {
  color: #ccc;
}

/* General layout adjustments */
.react-calendar {
  width: 100%;
  border: none;
  font-family: 'Arial', sans-serif;
}










.preview {
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
}

.preview img {
  margin-right: 10px;
}

.progress-bar {
  /* flex-grow: 1;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden; */
  width: 100px;
  height: 5px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-left: 10px;

}

.progress {
  height: 100%;
  background-color: #007bff;
  border-radius: 4px;
}

.preview span {
  margin-left: 10px;
  color: green;
}

