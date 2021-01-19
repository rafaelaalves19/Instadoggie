import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as Instadoggie } from '../Assets/dogs-footer.svg';

const Footer = () => {
    return ( 
        <footer className={styles.footer}>
            <Instadoggie />
            <p>Instadoggie. The dog's social media.</p>
        </footer>
    );
};

export default Footer;
