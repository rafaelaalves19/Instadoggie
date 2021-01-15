import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';

const LoginForm = () => {

    const username = useForm();
    const password = useForm();

    function handleSubmit(event) {
        event.preventDefault();

        if (username.validate() && password.validate()) {

        fetch('https://instadoggie-api.kinghost.net/json/jwt-auth/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((json) => {
            console.log(json);
        });
        }
    };
  
    return (
        <section>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <Input label="User" type="text" name="username" {...username} />
                <Input label="Password" type="password" name="password" {...password} />
                <Button>Enter</Button>
            </form>
            <Link to="/login/create">Register here</Link>
        </section>
    );
};


export default LoginForm;
