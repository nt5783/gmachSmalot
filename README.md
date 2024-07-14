# gmachSmalot
end to end project - gowns gemach
יום אחרי עד 1 בצהריים
לפי ימי עסקים
פתוח במוצש רק בחורף

change fetchfunc in Signup!!
error not autorized in add/update model many times

באגים:

cart number doubled on load!!
on login - set cart and date!! (for cart items in header)
message does'nt show!! like on add gown to cart
No available options אם בחרת תאריך ואתה לא משתמש
עשיתי לוגאאוט והוא אמר שיש לי תאריך בחור
נתן לי להיכנס להזמנה בלי שהייתי משתמש

הוספות- יכול לחכות:
שהמנהל יוכל לראות את כל ההזמנות הקיימות לדגם מסויים
passwords(google)
ביטול הזמנה
filters & search
שהמנהל יוכל לראות מודלים שבפח ולהוציא אותם
לפצל ולסדר CSS
שהשאילתות של המאפיינים יהיו גנריות
אבא זקס אומר שאתר צריך להיות מצחיק, לזרוק הודעות--איך זה עומד עליך

דברים שעוד צריך לעשות:
manager- delete: model, gown, update: gown,(model) , add: model, gown, props
סדר בקוד סדר באתר (עברית אנגלית לדוגמה)
לסדר את הQUERYS
שיעשה נכון טיפול בשגיאות, בלקוח ובשרת
אם מוסיף שמלה קיימת? שיוסיף כמות?- לתקן את המילים
להסתכל על בסיס הנתונים
we add sizeId in gowns what about models?
לוגיקה מהקווריס להעביר לסרביס
בטפסים שהצבע שבחר יהיה בסלקט
למחוק בקשות לא רלוונטיות מהשרת כמו מחק צבע
שגיאות בלוגין וסינאפ
בבקשות POST שיהיה אפשר להכניס בכל סדר
לתרגם את האתר לעיברית
בוחר כמות אפס, פועל טוב, לא מתריע
לצמצם גישות לDB
אם נגמר הטוקן? שיהיה אפשר להתחבר מחדש


?:
access token - cookies לפני ביצוע פעולות מנהל לבדוק (בAPP) שהתוקן תקין
אם מוסיף מודל קיים?
עדכון שמלה לא עובד
טופס עדכון שמלה מוזנח
למה יש מנהל? אולי שיראה את כל ההזמנות
לעשות הזמנה מהעגלה
מועדפים
לא עובד בסמינר דברים שבבית כן
צריך להוסיף אודיו???


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





#d4bfcc
#fdcc9d
#e1ddd5


בבקשת POST API, יכולות להיזרק מספר סוגים של שגיאות. הנה כמה מהשגיאות הנפוצות ביותר:

400 Bad Request:

כאשר הנתונים הנשלחים בבקשה אינם תואמים לפורמט המצופה (למשל, שדות חסרים או שדות בפורמט שגוי).
כאשר יש שגיאה בסינתקס של הבקשה.
401 Unauthorized:

כאשר המשתמש לא מאומת כראוי ואין לו הרשאה לבצע את הפעולה.
403 Forbidden:

כאשר למשתמש אין הרשאות לגשת למשאב או לבצע את הפעולה, למרות שהוא מאומת.
404 Not Found:

כאשר המשאב או ה-endpoint שאליו נשלחת הבקשה אינו קיים.
409 Conflict:

כאשר יש קונפליקט עם המצב הנוכחי של המשאב (למשל, כאשר מנסים ליצור משאב שכבר קיים).
500 Internal Server Error:

כאשר יש בעיה כללית בשרת שלא ניתן לטפל בה באופן ספציפי.
502 Bad Gateway:

כאשר השרת מקבל תגובה שגויה מהשרת העליון שאליו הוא מנסה להתחבר.
503 Service Unavailable:

כאשר השרת אינו זמין, בדרך כלל עקב תחזוקה או עומס יתר.
504 Gateway Timeout:

כאשר השרת העליון אינו מגיב בזמן.















בבקשת DELETE API, יכולות להיזרק מספר סוגים של שגיאות, חלקם דומים לבקשת POST. הנה השגיאות הנפוצות ביותר:

400 Bad Request:

כאשר הבקשה אינה תקינה או שחסרים בה פרמטרים נדרשים.
401 Unauthorized:

כאשר המשתמש לא מאומת כראוי ואין לו הרשאה לבצע את הפעולה.
403 Forbidden:

כאשר למשתמש אין הרשאות לגשת למשאב או לבצע את הפעולה, למרות שהוא מאומת.
404 Not Found:

כאשר המשאב שאותו מנסים למחוק אינו קיים.
409 Conflict:

כאשר יש קונפליקט עם המצב הנוכחי של המשאב (למשל, כאשר יש תלותים שמונעים את המחיקה).
500 Internal Server Error:

כאשר יש בעיה כללית בשרת שלא ניתן לטפל בה באופן ספציפי.
502 Bad Gateway:

כאשר השרת מקבל תגובה שגויה מהשרת העליון שאליו הוא מנסה להתחבר.
503 Service Unavailable:

כאשר השרת אינו זמין, בדרך כלל עקב תחזוקה או עומס יתר.
504 Gateway Timeout:

כאשר השרת העליון אינו מגיב בזמן.











controllers/userController.js:

השכבה שבה נמצאים הבקרות. אחראי על קבלת בקשות HTTP והעברתן לשירותים המתאימים. יכול לזרוק שגיאות אם יש בעיה בקבלת או עיבוד הנתונים.
queries/userQuery.js:

מכיל את השאילתות למסד הנתונים. יכול לזרוק שגיאות אם יש בעיה בגישה למסד הנתונים או בשאילתות.
services/userService.js:

מכיל את הלוגיקה העסקית של היישום. יכול לזרוק שגיאות אם יש בעיה בביצוע הלוגיקה העסקית.
routes/userRoutes.js:

מכיל את הגדרות הנתיבים ומפנה את הבקשות לבקרות המתאימות. בדרך כלל לא ייזרקו ממנו שגיאות, אך הוא יכול להעביר שגיאות שקיבל מהבקרות.
app.js:

קובץ ההגדרות הראשי של האפליקציה, שבו מוגדרים כל הנתיבים והמאגדים. יכול לזרוק שגיאות כלליות הקשורות לאתחול האפליקציה, אך בדרך כלל הוא מכיל טיפול שגיאות גלובלי שמתמודד עם שגיאות שנזרקות במהלך הרצת האפליקציה.










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
