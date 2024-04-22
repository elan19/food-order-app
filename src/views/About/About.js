import Footer from '../../components/footer/footer';

import styles from './About.module.css';

import personHoldingBurgersImage from '../../images/person-holding-burgers.jpg';

function About() {

    return (
        <div className={styles.menu}>
            <div className={styles.imgBanner}>

            </div>
            <div className={styles.container}>
                <div className={styles.topLeft}>
                    <h1>Om oss</h1>
                    <p>
                        Välkommen till Burger Brigade! Vi är ett dedikerat team av matälskare som delar en passion för att skapa fantastiska burgare. 
                        Med vår kärlek till kreativitet och kvalitet strävar vi efter att erbjuda våra kunder en unik och minnesvärd matupplevelse 
                        varje gång de besöker oss. Tack för att du är en del av vår matäventyr!
                    </p>
                </div>
                <div className={styles.topRight}>
                    <h1>Vår mat</h1>
                    <p>
                        Vår mat på Burger Brigade är resultatet av vår passion för kvalitet och smak. 
                        Vi använder en noggrant utvald blandning av färska och högkvalitativa ingredienser för att skapa burgare som inte bara är läckra, 
                        utan också minnesvärda. Oavsett om det är en klassisk favorit eller en unik specialitet från vår meny, 
                        kan du lita på att varje tugga är en explosion av smaker. Vår mat är mer än bara mat - 
                        det är en upplevelse av ren njutning och kärlek till goda smaker.
                    </p>
                </div>
                <div className={styles.pictureDiv}>
                    <img className={styles.aboutPicture} src={personHoldingBurgersImage} alt="Person Holding Two Burgers"/>
                </div>
                <div className={styles.botLeft}>
                    <h1>Köttet</h1>
                    <p>
                        På Burger Brigade är vi stolta över att använda kött av högsta kvalitet från noggrant utvalda leverantörer. 
                        Vi strävar efter att samarbeta med lokala och hållbara producenter för att säkerställa att vårt kött inte bara är av högsta kvalitet, 
                        utan också producerat med omsorg om djuren och miljön.
                    </p>
                </div>
                <div className={styles.botRight}>

                </div>

            </div>
            <Footer />
        </div>
    );
}

export default About;
