# gmachSmalot
end to end project - gowns gemach



להפוך put ל patch
להחליט שכל הגט יהיו ברבים עם S
שהמנהל יוכל לראות את כל ההזמנות הקיימות לדגם מסויים


יום אחרי עד 1 בצהריים
לפי ימי עסקים
פתוח במוצש רק בחורף


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



שיהיה אחידות בטבלאות של הקודים כרגע שמתי את הראשון עם אי די ואת השני בלי כלום (בצבעים)
וגם בשמות של אי די של כל אחד, שיכיל את שם החפץ או לא?


השארתי קצת בלאגן צריך שיציג שמלות ומודלים רק מהתאריכים הנכונים ושהשאילתה תכיל גם מה שצריך כל צבע מידה וכו








about: to fill
login: users
signup
passwords
(google)
manager
cart
payment
access token
cookies
filters & search
to style
סדר בקוד סדר באתר (עברית אנגלית לדוגמה)
responivity
לסדר את הQUERYS
לפני ביצוע פעולות מנהל לבדוק (בAPP) שהתוקן תקין
gowns			לפי תאריך
שיעשה נכון טיפול בשגיאות, בלקוח ובשרת