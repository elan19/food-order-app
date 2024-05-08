import Footer from '../../components/footer/footer';
import styles from './Contact.module.css';
import ContactComp from '../../components/Contact/contact';

function Contact() {

    return (
        <div className={styles.menu}>
            <ContactComp />
            <Footer />
        </div>
    );
}

export default Contact;
