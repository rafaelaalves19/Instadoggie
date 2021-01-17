import React from 'react';

const types = {
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Please insert a valid email',
    },

    password: {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
        message: 'Minimum requirements: 6 characters, 1 upercase, 1 lowercase and 1 number.',
    },

    number: {
        regex: /^\d+$/,
        message: 'Please use only number',
    },
};


const useForm = (type) => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(null);


    function validate(value) {
        if (type === false) return true;
        if (value.length === 0) {
            setError('Please insert a valid value');
            return false;
        }   else if (types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        }   else {
            setError(null);
            return true;
        }
    }




    function onChange({ target }) {
        if (error) validate(target.value);
        setValue(target.value);
      }
    




    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value),
    
    };
};

export default useForm;
