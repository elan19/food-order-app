import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer() {

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <p>© Copyright 2024 Burger Brigade AB. All rights reserved.</p>
                <p>Made for an exam assignment on BTH in spring 2024.</p>
                <Link to="/menu" className={styles.btn}>Beställ &gt;</Link>
            </div>
            <div className={styles.rightSide}>
                <h2 className={styles.underline}>Links</h2>
                <li>
                <Link to="/about" className={styles.footerLinks}>
                    About
                </Link>
                </li>
                <li>
                <Link to="/contact" className={styles.footerLinks}>
                    Contact
                </Link>
                </li>
                <a className={styles.aLink} href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x46566c5d885672ad:0xaf2766d9ba1a2349?sa=X&ved=1t:8290&ictx=111">
                    Valhallavägen 10, 371 79 Karlskrona
                </a>
            </div>
        </div>
      );
}

export default Footer;