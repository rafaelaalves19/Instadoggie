import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Instadoggie } from '../Assets/dogs.svg'; //importing the logo as a component
import { UserContext } from '../UserContext';

const Header = () => {
    const { data } = React.useContext(UserContext);

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}> 
                <Link className={styles.logo} to="/" aria-label="Instadoggie - Home">
                    <Instadoggie /> 
                </Link>
                {data ? (
                <Link className={styles.login} to="/account">
                    {data.name}
                </Link>
                ) : (
                <Link className={styles.login} to="/login">
                    Login | Register
                </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
