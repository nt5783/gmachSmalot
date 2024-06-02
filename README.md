# gmachSmalot
end to end project - gowns gemach



להפוך put ל patch
להחליט שכל הגט יהיו ברבים עם S
שהמנהל יוכל לראות את כל ההזמנות הקיימות לדגם מסויים





שאילתות
UPDATE `gmachsmalot`.`models` SET `color` = 'blue' WHERE (`model` = '888');

UPDATE models SET color= 'black' WHERE model = '222'

/* V שמלות תפוסות בתאריך*/
select *
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09';

/*שמלות שכל הכמות שלהן תפוסה בתאריך

select *,COUNT(*) as QuantityOccupied
from gowns g JOIN orders o
where g.id=o.gownId and eventDate='2024-08-09' and QuantityOccupied=g.amount
group by gownId;

*/
select *
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X
where QuantityOccupied=x.amount;

/*שמלות פנויות בתאריך*/
select *
from gowns
except
select g.gownId, g.model, g.size,
from(
select *,COUNT(*) as QuantityOccupied
from gowns g NATURAL JOIN orders o
where eventDate='2024-08-09'
group by gownId) X
where QuantityOccupied=x.amount;

/*מודלים פנויים בתאריך */