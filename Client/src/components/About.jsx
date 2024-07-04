// // import React, { useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// // import { AppContext } from "../App";
// //מומלץ לראות שהתוכן לא סותר את מציאות האתר
// function About() {
//     return (<>
//         <h2>GMAH event dresses Neve Ya'akov Jerusalem</h2>
//         <p>The GMAH is constantly updated and brings the latest and newest models!<br /><b>Approximately 80 dresses in each set!</b></p>
//         <p>Important to note! Ordering dresses on the website does not replace coming to the GMAH. You must come and measure the dress before ordering</p>
//         {/* <p>To book an appointment call 03-3065480 human response at tel. 1-800-55-20-20 extension 8<br />gsmalot@gmail.com</p>
//         <p>Regulations and procedures: */}

//         {/* In GMAH there are many sets of event dresses for girls, girls and women (up to size 52). These are recent and large sets of up to 100 dresses in a set. */}
//         <p>
//             <h4>Contact:</h4>

//             It is not possible to cancel an order or make changes to an email.
//             <br />
//             In order to order dresses at GMAH, you must make an appointment by calling the number: 03-3065480.
//             <br />
//             Human response, for short and urgent questions only, at tel. 1800552020 extension 8, after the recorded message,
//             On Sundays between 9:00-10:30 a.m. and on Mondays, Tuesdays, Wednesdays, and Thursdays between 9:00-10:30 p.m.
//             <br />
//             Email: gsmalot@gmail.com
//         </p>

//         <h2>Regulations and procedures:</h2>
//         <p>
//             <h4>Order the dresses:</h4>

//             The payment for renting a dress, to partially cover the expenses, is NIS 50 for a girl's dress, and NIS 100 for a girls' dress.
//             <br />
//             Payment at the time of registration, you must prepare a payment in advance.
//             <br />
//             The order of the dresses is made upon arrival at the GAM, with full payment and signature of the GAM's procedures. It is not possible to order by email.
//             <br />
//             Cancellation of an order - with a notice of two weeks in advance - will be charged a fee of NIS 20 for a girl's dress, and NIS 30 for a girls' dress.
//             Cancellation of an order will be made with a notice of two weeks in advance. Cancellation less than two weeks before the event will be charged at 50%.
//             Changing a model - like canceling a dress.
//         </p>

//         <p>
//             <h4>Receiving the dresses:</h4>

//             Receiving the dresses - two days before the wedding.
//             You must have credit information for a deposit.
//             <br />
//             When receiving the dresses, you are responsible for making sure that you received exactly what you ordered.

//             <h4>Returning the dresses:</h4>

//             Do not wash the dresses.
//             <br />
//             The dresses must be returned to the GMAH the day after the wedding by 1:00 p.m.
//             Delay in returning the dresses will result in an additional rental charge for each dress per day.
//             <br />
//             Please check that you have returned everything. Includes accessories and packaging.
//         </p>

//         <p>
//             <h4>Corrections:</h4>

//             Do not make any repairs to the dresses without receiving express and specific permission from the management.
//             <br />
//             Even if you received permission to make a repair, this is only on the condition that the dress is returned to its previous state without leaving any traces.
//             <br />
//             A repair that will not be fully returned to its original condition - the repair fee will be charged for it, plus a NIS 100 handling fee!!!
//             <br />
//             However - the dresses must be returned on time.
//             <br />
//             The dresses must be kept, and if damage is caused - bear all the direct and indirect expenses and losses caused to the GMAH.
//         </p>
        
//         <p>
//             <h4>Arriving at GMAH:</h4>

//             The address of the GMC: 1 Zuckerman St., behind the stairs from Pardes St., adjacent to the Beit Tefila synagogue.<br />
//             Bus lines: 59,69, 85,25. Get off at the station: Pardes Zuckerman (in the other direction is Pardes Gulak and cross the road) and go down the stairs.
//             <br />
//             Do not under any circumstances bring babies, strollers, boys, and girls who do not need to be measured!
//             <br />
//             No entry for men!
//             <br />
//             At the request of the neighbors, do not park your vehicles close to the gas station and the buildings, even for a short time. You can park on the upper level at the entrance to the street.
//         </p>
//         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.2926398087297!2d35.24511695812035!3d31.84425110043901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15032a58c18df151%3A0xf931c6d2c527d657!2z15HXqNeV15og16bXlden16jXntefLCDXmdeo15XXqdec15nXnQ!5e0!3m2!1siw!2sil!4v1716902537182!5m2!1siw!2sil"
//             style={{ height: 450, width: 600, border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
//     </>)
// }

// export default About


//         // <h2>גמ"ח שמלות ארועים נווה יעקב ירושלים</h2>
//         // <p>הגמ"ח מתעדכן כל הזמן ומביא את הדגמים העדכניים והחדישים ביותר!<br /><b>כ80 שמלות בכל סט!</b></p>
//         // <p>חשוב לציין! הזמנת שמלות באתר אינה באה להחליף את ההגעה לגמ"ח. יש לבוא ולמדוד את השמלה בטרם ההזמנה</p>
//         // {/* <p>להזמנת תור חייגו 03-3065480 מענה אנושי בטל' 1-800-55-20-20 שלוחה 8<br />gsmalot@gmail.com</p>
//         // <p>תקנון ונהלים: */}

//         // {/* בגמ"ח ישנם סטים רבים של שמלות אירועים לילדות, נערות ונשים(עד מידה 52). מדובר בסטים עדכניים וגדולים עד 100 שמלות בסט. */}
//         // <p>
//         //     <h4>יצירת קשר:</h4>

//         //     אין אפשרות לבטל הזמנה או לבצע שינויים במייל.
//         //     <br />
//         //     בכדי להזמין שמלות בגמ"ח יש לקבוע תור בטלפון שמספרו: 03-3065480.
//         //     <br />
//         //     מענה אנושי, לשאלות קצרות ודחופות בלבד, בטל' 1800552020 שלוחה 8, לאחר ההודעה המוקלטת,
//         //     ביום א' בין 9:00-10:30 בבוקר ובימים ב' ג' ד 'ה' בין 21:00-22:30
//         //     <br />
//         //     מייל: gsmalot@gmail.com
//         // </p>
//         // <h2>תקנון ונהלים:</h2>
//         // <p>
//         //     <h4>הזמנת השמלות:</h4>

//         //     התשלום עבור שכירות שמלה, לכסוי חלקי של ההוצאות, הוא 50 ₪ לשמלת ילדות, ו-100 ₪ לשמלת נערות.
//         //     <br />
//         //     התשלום בשעת הרישום, יש להצטייד בתשלום מראש.
//         //     <br />
//         //     הזמנת השמלות  מתבצעת בהגעה לגמ"ח, עם תשלום מלא וחתימה על נהלי הגמ"ח. אין אפשרות להזמין במייל.
//         //     <br />
//         //     ביטול הזמנה – בהתראה של שבועיים מראש - תחויב בתשלום של 20 ₪ לשמלת ילדות, ו-30 ₪ לשמלת נערות.
//         //     ביטול הזמנה תתבצע בהתראה של שבועיים מראש. ביטול פחות משבועיים לפני האירוע יחוייב במחיר 50%.
//         //     החלפת דגם - כביטול שמלה.
//         // </p>
//         // <p>
//         //     <h4>קבלת השמלות:</h4>

//         //     קבלת השמלות - יומיים לפני החתונה.
//         //     יש להצטייד בפרטי אשראי לצורך פיקדון.
//         //     <br />
//         //     בעת קבלת השמלות, מוטלת עליכם האחריות לוודא שאכן קיבלתם בדיוק מה שהזמנתם.

//         //     <h4>החזרת השמלות:</h4>
            
//         //     אין לכבס את השמלות.
//         //     <br />
//         //     את השמלות צריך להחזיר לגמ"ח יום למחרת החתונה עד השעה 13:00.
//         //     איחור בהחזרת השמלות, יגרור חיוב עלות השכרה נוספת, עבור כל שמלה לכל יום.
//         //     <br />
//         //     נא לבדוק שהחזרתם הכל. כולל אביזרים ואריזות.
//         // </p>
//         // <p>
//         //     <h4>תיקונים:</h4>

//         //     אין לבצע שום תיקונים בשמלות ללא קבלת רשות מפורשת ונקודתית מההנהלה.
//         //     <br />
//         //     גם במקרה שקיבלתם רשות לבצע תיקון, זאת אך ורק בתנאי שהשמלה תוחזר למצבה הקודם מבלי שישארו עקבות.
//         //     <br />
//         //     תיקון שלא יוחזר לגמרי לקדמותו כראוי - יגבה עבורו דמי התיקון, בתוספת 100 ש"ח דמי טיפול!!!
//         //     <br />
//         //     עם זאת – יש להחזיר את השמלות בזמן.
//         //     <br />
//         //     יש לשמור על השמלות, ובמידה ונגרם נזק – לשאת בכל ההוצאות וההפסדים הישירים והעקיפים שנגרמו לגמ"ח.
//         //     </p>
//         // <p>
//         //     <h4>ההגעה לגמ"ח:</h4>

//         //     כתובת הגמ"ח: רחוב צוקרמן 1 , מאחורי המדרגות מרח' פרדס צמוד  לבית כנסת 'בית תפילה'.<br />
//         //      קווי אוטובוס: 59,69, 85,25. יש לרדת בתחנה: פרדס צוקרמן (בכיוון השני פרדס גולאק ולחצות את הכביש) ולרדת במדרגות.
//         //     <br />
//         //     אין להביא בשום פנים ואופן תינוקים, עגלות, בנים, וילדות שאינן זקוקות למדידה!
//         //     <br />
//         //     אין כניסה לגברים!
//         //     <br />
//         //     לבקשת השכנים אין להחנות את רכביכם בסמיכות לגמ"ח ולבנינים אפילו לזמן קצר. ניתן לחנות במפלס העליון שבכניסה לרחוב .
//         // </p>


























import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
//מומלץ לראות שהתוכן לא סותר את מציאות האתר
function About() {
    return (
        <div className="about-container">
            <h2>GMAH Event Dresses Neve Ya'akov Jerusalem</h2>
            <p>The GMAH is constantly updated with the latest and newest models!<br /><b>Approximately 80 dresses in each set!</b></p>
            <p>Important to note! Ordering dresses on the website does not replace coming to the GMAH. You must come and measure the dress before ordering.</p>

            <div className="contact-section">
                <h4>Contact:</h4>
                <p>
                    It is not possible to cancel an order or make changes via email.<br />
                    To order dresses at GMAH, make an appointment by calling: <br />
                    <strong>03-3065480</strong><br />
                    For urgent inquiries, call: <strong>1-800-55-20-20 ext. 8</strong><br />
                    Email: <a href="mailto:gsmalot@gmail.com">gsmalot@gmail.com</a>
                </p>
            </div>

            <h2>Regulations and Procedures:</h2>
            <div className="regulations-section">
                <h4>Ordering Dresses:</h4>
                <p>
                    Payment for renting a dress: NIS 50 for a girl's dress, NIS 100 for a woman's dress.<br />
                    Payment at registration. Full payment and signature of GMAH's procedures required to place an order.<br />
                    Orders cannot be made via email.
                </p>

                <h4>Receiving Dresses:</h4>
                <p>
                    Dress pickup: two days before the event.<br />
                    Credit information required for deposit.<br />
                    Verify dress order upon receipt.
                </p>

                <h4>Returning Dresses:</h4>
                <p>
                    Do not wash dresses.<br />
                    Return dresses by 1:00 PM the day after the event.<br />
                    Late returns will incur additional charges.
                </p>

                <h4>Alterations:</h4>
                <p>
                    No repairs without explicit permission from management.<br />
                    Unauthorized repairs will incur fees.<br />
                    Hold full responsibility for dress condition and damages.
                </p>

                <h4>Arriving at GMAH:</h4>
                <p>
                    Address: 1 Zuckerman St., Neve Ya'akov, Jerusalem.<br />
                    Accessible by bus lines: 59, 69, 85, 25 (Pardes Zuckerman stop).<br />
                    No entry for men or children not being measured.<br />
                    Please respect parking regulations.
                </p>
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.2926398087297!2d35.24511695812035!3d31.84425110043901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15032a58c18df151%3A0xf931c6d2c527d657!2z15HXqNeV15og16bXlden16jXntefLCDXmdeo15XXqdec15nXnQ!5e0!3m2!1siw!2sil!4v1716902537182!5m2!1siw!2sil"
                style={{ height: 450, width: 600, border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    );
}

export default About;
