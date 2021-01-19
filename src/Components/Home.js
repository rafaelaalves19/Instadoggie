import React from 'react';
import Feed from './Feed/Feed';
import Head from './Interface/Head';


const Home = () => {
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
