import React from 'react';

const UserPost = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
  
    fetch('https://instadoggie-api.kinghost.net/json/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            email,
        }),
    }).then((response) => {
        console.log(response);
        return response.json();
      }).then((json) => {
        console.log(json);
        return json;
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />
        <button>Send</button>
    </form>
  );
};

  export default UserPost;




