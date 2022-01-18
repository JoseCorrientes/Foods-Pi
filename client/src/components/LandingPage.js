import  React from 'react';
import { Link } from 'react-router-dom';
import LandingPageCSS from './LandingPage.module.css';

const LandingPage = () => {
 
    return(
        <div className={LandingPageCSS.mainContainerLanding}>
            <Link to ='/home'
                  className={LandingPageCSS.link} >
                  ENTER
            </Link>
        </div>
    )
};

export default LandingPage;