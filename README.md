# gmachSmalot
end to end project - gowns gemach
יום אחרי עד 1 בצהריים
לפי ימי עסקים
פתוח במוצש רק בחורף

paypal: // secret: EBmxh8uI1KFwfFNMZEatL0bMSlcTeo0uB0mjqG7Mqf42EeM007iTfH0nVGCTF5KOJ9kU-GYiYK5JqgGi


באגים:
כשמוסיפים מידה שהמידות יעמו לפי הסדרד

הוספות- יכול לחכות:
שהמנהל יוכל לראות את כל ההזמנות הקיימות לדגם מסויים
passwords(google)
ביטול הזמנה
filters & search
שהמנהל יוכל לראות מודלים שבפח ולהוציא אותם
לפצל ולסדר CSS
אבא זקס אומר שאתר צריך להיות מצחיק, לזרוק הודעות--איך זה עומד עליך
צריך להוסיף אודיו???

דברים שעוד צריך לעשות:
change the name of gowns to size
סדר בקוד סדר באתר (עברית אנגלית לדוגמה)
לסדר את הQUERYS
שיעשה נכון טיפול בשגיאות, בלקוח ובשרת
להסתכל על בסיס הנתונים
we add sizeId in gowns what about models?
לוגיקה מהקווריס להעביר לסרביס
בטפסים שהצבע שבחר יהיה בסלקט
שגיאות בלוגין וסינאפ
לתרגם את האתר לעיברית
בוחר כמות אפס, פועל טוב, לא מתריע
לצמצם גישות לDB
אם נגמר הטוקן? שיהיה אפשר להתחבר מחדש


?:
למה יש מנהל? אולי שיראה את כל ההזמנות
לא עובד בסמינר דברים שבבית כן



דברים שנעשו!:
Payment
to style
about: to fill
login: users
signup
cart
gowns			לפי תאריך
עדכון כמות בהוספת שמלה לא עובד
כשעומדים על מודל שיראה פרטים
להסתכל בדרישות הפרויקט
access token - cookies לפני ביצוע פעולות מנהל לבדוק (בAPP) שהתוקן תקין
cart number doubled on load!!
שהשאילתות של המאפיינים יהיו גנריות



#d4bfcc
#fdcc9d
#e1ddd5


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
