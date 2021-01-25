import React from 'react';
import styles from './PlayDate.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { EVENT_POST } from '../../Api';
import Error from '../Interface/Error';
import Head from '../Interface/Head';
// import moment from 'moment';

const EventPost = () => {

    const name = useForm();
    const description = useForm();
    const local = useForm();
    const date = useForm();
    const time = useForm();
    const { data, error, loading, request } = useFetch();
    // const today = new moment().format("YYYY-MM-DD");
    // const now = new moment().format("HH:mm");
    const navigate = useNavigate();

    React.useEffect(() => {
        if (data) navigate('/account/playdate');
    }, [data, navigate]);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('description', description.value);
        formData.append('local', local.value);
        formData.append('date', date.value);
        formData.append('time', time.value);

        const token = window.localStorage.getItem('token');
        const { url, options } = EVENT_POST(formData, token);
        request(url, options);
    }

    return ( 
        <section className={`${styles.event} animeLeft`}>
            <Head title="Schedule a meeting" />
            <form onSubmit={handleSubmit}>
                <Input label="PlayDate name" type="text" name="name" {...name} />
                <Input label="Description" type="text" name="description" {...description} />
                <Input label="Local" type="text" name="local" {...local} />
                <Input label="Date" type="date" name="date" {...date} />
                <Input label="Time" type="time" name="time" {...time} />
                
                {loading ? (
                    <Button disabled>Sending...</Button>
                ) : (
                    <Button>Send</Button>
                )}
                <Error error={error} />
            </form>
        </section>
    );

}

export default EventPost;