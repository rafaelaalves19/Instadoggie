import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Error from '../Interface/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import Head from '../Interface/Head';


const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value) 
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="User name" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
        <Button>Enter</Button>
        )}
        <Error error={error && "Incorrect information!"} />
      </form>
      <Link className={styles.reset} to="/login/reset">
        Have lost your password?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Register here</h2>
        <p>Still don't have an account? Register on our website</p>
        <Link className={stylesBtn.button} to="/login/create">
          Register
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
