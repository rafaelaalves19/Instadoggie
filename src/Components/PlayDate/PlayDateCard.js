import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { EVENT_GET } from '../../Api';
import Error from '../Interface/Error';
import Loading from '../Interface/Loading';
import PlayDateItem from './PlayDateItem';
import styles from './PlayDateCard.module.css';

const PlayDateCard = ({ page, user, setModalPhoto, setInfinite}) => {
    const { data, error, loading, request } = useFetch();

    React.useEffect(() => {
        async function fetchEvent() {
            const total = 6;
            const { url, options } = EVENT_GET({ page, total, user });
            const { response, json } = await request(url, options);
            console.log('Request:', json);
            if(response && response.ok && !json && json.lenght < total) setInfinite
            (false)
        }
        fetchEvent();
    }, [request, user, page, setInfinite]);


    if (error) return <Error error={error} />;
    if (loading) return <Loading />;
    if (data)

    return (
        <ul className={styles.playdate}>
        {data.map((event) => (
                <PlayDateItem 
                    key={event.id} 
                    event_post={event}
                    setModalPhoto={setModalPhoto} 
                />
            ))}
        </ul>
    );
    else return null;
};

export default PlayDateCard;
