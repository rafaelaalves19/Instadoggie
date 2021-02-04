import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';


const UserHeader = () => {
  const [title, setTitle] = React.useState('');
  const location = useLocation();


  React.useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/': 
        setTitle('Feed'); 
        break;
      case '/account/posting':
        setTitle('Posting photo');
        break;
      case '/account/playdate':
        setTitle('Play date');
        break;
      case '/account/schedule':
        setTitle('New play date');
        break;
      default:
        setTitle('My account');
    }
  }, [location]);


  return (
  <header className={styles.header}>
    <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
