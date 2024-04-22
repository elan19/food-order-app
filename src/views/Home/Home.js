import { Link } from 'react-router-dom';

import './home.style.css';

function Home() {

    return (
        <div className='home-body'>
            <div className="home-container">
                    
                <div className="right-side">
                    <h1>Framtidens burgers är här!</h1>
                    <Link to="/menu" className="btn btn-primary">Beställ &gt;</Link>
                </div>
                <div className='left-side'>

                </div>
            </div>
        </div>
    );
}

export default Home;
