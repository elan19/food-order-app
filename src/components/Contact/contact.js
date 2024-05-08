import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import contactModel from '../../Models/contactModel';
import styles from './contact.module.css';

function Contact() {
    const [showTextarea, setShowTextarea] = useState(true);
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        // Get form data
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Create a contactItem object
        const contactItem = {
            name: name,
            email: email,
            message: message
        };

        try {
            // Call the create function from your contactModel
            const docId = await contactModel.create(contactItem);
            console.log('Form data sent to Firestore successfully. Document ID:', docId);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error('Error sending form data to Firestore:', error);
        }
    };

    // If form submitted successfully, show success message
    if (submitted) {
        return (
            <div className={styles.container}>
                <h1>Form sent!</h1>
                <p>Thank you for contacting us! We'll get back to you soon.</p>
                <p>You will be redirected after 3 seconds.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Contact us</h1>
            <form id="contactForm" className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input type="text" id="name" placeholder="NAME" name="name" required/>
                </div>

                <div className={styles.formGroup}>
                    <input type="email" id="email" placeholder="EMAIL" name="email" required/>
                </div>

                {showTextarea && (
                    <div className={styles.rightSideText}>
                        <p>If you have any tips and ideas about any of our product, or if you just want to contact us. <br/>Feel free to reach out to us.</p>
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
    );
}

export default Contact;
