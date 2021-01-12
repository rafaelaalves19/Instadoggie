import React from 'react';

const PhotoGet = () => {

    function handleSubmit(event) {
        event.preventDefault();

        fetch('https://instadoggie-api.kinghost.net/json/api/photo')
            .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((json) => {
          console.log(json);
          return json;
        });
    }
  
    
    return (
        <form onSubmit={handleSubmit}>
          <input type = "text" />
          <button>Send</button>
        </form>
    );
};

export default PhotoGet
