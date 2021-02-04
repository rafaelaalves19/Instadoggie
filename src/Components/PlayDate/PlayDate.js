import React from 'react';
import Head from '../Interface/Head';
import PlayDateCard from './PlayDateCard';
import { NavLink } from 'react-router-dom';
import styles from './PlayDate.module.css';

//paginação - quantidade de cards
const PlayDate = () => {

    const [pages, setPages] = React.useState([1]);
    
    const [infinite, setInfinite] = React.useState(true);

    //render the infite scroll
    React.useEffect(() => {
        let wait = false;
        function infiniteScroll() {
            if (infinite) {
                const scroll = window.scrollY;
                const height = document.body.offsetHeight - window.innerHeight;
                if (scroll > height * 0.75 && !wait) {
                    setPages((pages) => [...pages, pages.length + 1]);
                    wait = true;
                    setTimeout(() => {
                        wait = false;
                    }, 500);
                }
            }
        }

        window.addEventListener('wheel', infiniteScroll);
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener('wheel', infiniteScroll);
            window.removeEventListener('scroll', infiniteScroll);
        };
    }, [infinite]);

    return ( 
        <section className={`${styles.playdate} animeLeft`}>
            <Head title="Play date" />
            {/* map to list the array */}
            {pages.map((page) => (
                <PlayDateCard
                    key={page}
                    page={page}
                    setInfinite={setInfinite}
                />
            ))}

            <nav className={styles.createButtonWrapper}>
                <h2 className={styles.subtitle}>Create your new play date</h2>
                <NavLink className={styles.createButton} to="/account/schedule">
                    <span className={styles.createIcon}>+</span><span>Click here</span>
                </NavLink>
            </nav>
        </section>
    );

}

export default PlayDate;