import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Interface/Error';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../Api';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import Head from '../Interface/Head';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm(); //passar password dentro desse () pra validar a senha difícil

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <Head title="Create an account" />
      <h1 className="title">Register here</h1>
      <form onSubmit={handleSubmit}>
        <Input label="User name" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Password" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Creating...</Button>
        ) : (
          <Button>Create</Button>
        )}
        <Error error={error} />
        </form>
    </section>
  );
};

export default LoginCreate;