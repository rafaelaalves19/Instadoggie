import React from 'react';
import UserHeader from './UserHeader';
import { Routes, Route } from 'react-router-dom';
import Feed from '../Feed/Feed';
import UserPhotoPost from './UserPhotoPost';
import { UserContext } from '../../UserContext';
import Head from '../Interface/Head';
import PlayDatePost from '../PlayDate/PlayDatePost';
import PlayDate from '../PlayDate/PlayDate';

const User = () => {
    const {data} = React.useContext(UserContext);


    return (
        <section className="container">
            <Head title="My Account" />
            <UserHeader />
            <Routes>
                <Route path="/" element={<Feed user={data.id} />} />
                <Route path="posting" element={<UserPhotoPost />} />
                <Route path="schedule" element={<PlayDatePost />} />
                <Route path="playdate" element={<PlayDate />} />
            </Routes>


        </section>
    );
};

export default User;