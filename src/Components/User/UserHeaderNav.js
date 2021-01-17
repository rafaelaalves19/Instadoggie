import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {ReactComponent as Myphotos} from '../../Assets/feed.svg';
import {ReactComponent as Statistics} from '../../Assets/statistics.svg';
import {ReactComponent as Postphoto} from '../../Assets/add.svg';
import {ReactComponent as Exit} from '../../Assets/exit.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {
    const { userLogout } = React.useContext(UserContext);
    const mobile = useMedia('(max-width: 40rem)');
    const [mobileMenu, setMobileMenu] = React.useState(false);

    const { pathname } = useLocation();
    React.useEffect(() => {
      setMobileMenu(false);
    }, [pathname]);

    return (
        <>
        {mobile && (
            <button 
                aria-label="Menu"
                className={`${styles.mobileButton} ${
                    mobileMenu && styles.mobileButtonActive
                }`}        
                onClick={() => setMobileMenu(!mobileMenu)}>
            </button>
        )}


        <nav 
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >

            <NavLink to="/account" end activeClassName={styles.active}>
                <Myphotos />
                {mobile && 'My photos'}
            </NavLink>
           
            <NavLink to="/account/statistics" activeClassName={styles.active}>
                <Statistics />
                {mobile && 'Statistics'}
            </NavLink>
            
            <NavLink to="/account/posting" activeClassName={styles.active}>
                <Postphoto />
                {mobile && 'Post photo'}
            </NavLink>
           
            <button onClick={userLogout}>
                <Exit />
                {mobile && 'Exit'}
            </button>
        </nav>
        </>
    );
};

export default UserHeaderNav;
