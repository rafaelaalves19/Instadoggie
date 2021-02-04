import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import User from './Components/User/User';
import RouteProtection from './Components/Interface/RouteProtection';
import Photo from './Components/Photo/Photo';
import UserProfile from './Components/User/UserProfile';

//building my app body - global components
//BrowserRouter involves the whole app 
//all the routes inside Routes, between header and footer
//each route path renders the element page
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="AppBody">
          <Routes> 
            <Route path="/*" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <RouteProtection path="account/*" element={<User />} />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="profile/:user" element={<UserProfile />} />
          </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}


export default App;


