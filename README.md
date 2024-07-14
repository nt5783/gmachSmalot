# gmachSmalot
end to end project - gowns gemach
יום אחרי עד 1 בצהריים
לפי ימי עסקים
פתוח במוצש רק בחורף


לשנות צבע כפתורי מנהל
להעתיק לreadme from loginController

באגים:
tostring date in order
redirect from login from orderNow? -date?
נתן לי להיכנס להזמנה בלי שהייתי משתמש
כשמוסיפים מידה שהמידות יעמדו לפי הסדר
הזמנות להיום לראות כשאין

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




בסרביס:


   async updateOrder(id, value) {
        const driverQuery = getIdQuery('drivers', 'userId = ?')
        const driverResult = await executeQuery(driverQuery, [value.driverId])
        const queryUpdateOrder = updateQuery('orders', `driverId = ?`, 'id = ?');
        const orderResult = await executeQuery(queryUpdateOrder, [driverResult[0].id, id]);
        if (orderResult.affectedRows)
            return orderResult;
        throw { status: 404, message: "Order not found" };
    }

בקונטרולר:

    async updateOrder(req, res, next) {
        try {
            const orderService = new OrderService();
            await orderService.updateOrder(req.params.id, req.body);
            res.json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.status == undefined ? 500 : ex.status;
            err.message = ex.message == undefined ? ex : ex.message;
            next(err)
        }
    }



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
