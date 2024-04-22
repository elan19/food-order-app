import AllMenus from "../../components/Menu/getAllMenu";
import Footer from '../../components/footer/footer';

import styles from './Menu.module.css';

function Menu() {

    return (
        <div className={styles.menu}>
            <div className={styles.container}>
                <h1 className={styles.containerH1}>MENU</h1>
                <p className={styles.italicText}>* Menu includes Fries and drink</p>
                <p className={styles.italicText}>* Prices is in SEK (Swedish Kronor)</p>
                <div className={styles.rightSide}>

                <AllMenus />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Menu;
