import React, { useEffect } from 'react'
import Feed from './Feed/Feed';
import Head from './Interface/Head';

const Home = () => {

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if(!token) {
            window.location = "/login";
        }
    });
    
    
    return (
        <section className="container mainContainer">
        <Head
            title="Photos"
            description="Instadoggie Home, with a photo feed." 
        />
        <Feed />
    </section>
    );
};

export default Home;
