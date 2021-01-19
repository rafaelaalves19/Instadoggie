import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../Api';
import Error from '../Interface/Error';
import Head from '../Interface/Head';

const LoginPasswordLost = () => {
    const login = useForm();
    const { data, loading, error, request } = useFetch();
    
    async function handleSubmit(event) {
        event.preventDefault();
        if (login.validate()) {
            const {url, options} = PASSWORD_LOST({
                login: login.value, 
                url: window.location.href.replace('lost', 'reset'),
            });
            const {json} = await request(url,options);
            console.log(json);
        }
    }
    
    return (
        <section>
            <Head title="Lost password" />
            <h1 className="title">Have lost your password?</h1>
            {data ? ( 
                <p style={{ color: '#4c1' }}>{data}</p>
            ) : ( 
                <form onSubmit={handleSubmit}>
                    <Input label="Email | User" type="text" name="login" {...login} />
                    {loading ? (
                        <Button disabled>Sending...</Button>
                    ) : (
                        <Button>Send email</Button>
                    )}
                </form>
            )}
            <Error error={error} />
        </section>
    );  
};

export default LoginPasswordLost;
