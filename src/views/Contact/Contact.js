import React, { useState, useEffect } from 'react';

import Footer from '../../components/footer/footer';
import styles from './Contact.module.css';

function Contact() {
    const [showTextarea, setShowTextarea] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setShowTextarea(window.innerWidth > 1200);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.menu}>
            <div className={styles.container}>
                <h1>Contact us</h1>
                <form id="contactForm" className={styles.form} action="#" method="POST">
                    <div className={styles.formGroup}>
                        <input type="text" id="name" placeholder="NAME" name="name" required/>
                    </div>

                    <div className={styles.formGroup}>
                        <input type="email" id="email" placeholder="EMAIL" name="email" required/>
                    </div>

                    {showTextarea && (
                        <div className={styles.rightSideText}>
                            <p>If you have any tips and ideas about any of our product. Feel free to reach out to us.</p>
                        </div>
                    )}

                    <div className={styles.formGroupText}>
                        <textarea className={styles.formText} rows="10" placeholder="MESSAGE" name="message" required></textarea>
                    </div>
                    
                    <div className={styles.buttonDiv}>
                        <button className={styles.button} id="submit" type="submit" value="SEND">
                            SEND
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
