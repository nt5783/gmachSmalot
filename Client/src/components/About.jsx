import React from 'react';

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
