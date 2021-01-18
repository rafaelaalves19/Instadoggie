import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../Api';
import Error from '../Interface/Error';
import Loading from '../Interface/Loading';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite}) => {
    const { data, error, loading, request } = useFetch();

    React.useEffect(() => {
        async function fetchPhotos() {
            const total =6;
            const { url, options } = PHOTOS_GET({ page, total, user });
            const { response, json } = await request(url, options);
            console.log('Request:', json);
            if(response && response.ok && json.lenght < total) setInfinite
            (false)
        }
        fetchPhotos();
    }, [request, user, page, setInfinite]);


    if (error) return <Error error={error} />;
    if (loading) return <Loading />;
    if (data)

    return (
        <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
                <FeedPhotosItem
                key={photo.id} 
                photo={photo}
                setModalPhoto={setModalPhoto} 
                />
            ))}
        </ul>
    );
    else return null;
};

export default FeedPhotos;
