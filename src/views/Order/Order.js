import SingleOrder from "../../components/Order/singleOrder";
import Footer from '../../components/footer/footer';

import styles from './Order.module.css';

function Order() {

    return (
        <div className={styles.menu}>
            <div className={styles.container}>
                <SingleOrder />
            </div>
            <Footer />
        </div>
    );
}

export default Order;
