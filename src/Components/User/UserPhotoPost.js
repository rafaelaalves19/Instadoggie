import React from 'react';
import styles from './UserPhotoPost.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../Api';
import { useNavigate } from 'react-router-dom';
import Error from '../Interface/Error';
import Head from '../Interface/Head';


const UserPhotoPost = () => {
    
    const name = useForm();
    const weight = useForm('number');
    const age = useForm('number');
    const subtitle = useForm();
    const [img, setImg] = React.useState({});
    const { data, error, loading, request } = useFetch();
    const navigate = useNavigate();


    React.useEffect(() => {
        if (data) navigate('/account');
    }, [data, navigate]);
    

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('img', img.raw);
        formData.append('name', name.value);
        formData.append('weight', weight.value);
        formData.append('age', age.value);
        formData.append('subtitle', subtitle.value);

        const token = window.localStorage.getItem('token');
        const { url, options } = PHOTO_POST(formData, token);
        request(url, options);
    }


    function handleImgChange({ target }) {
        setImg({
          preview: URL.createObjectURL(target.files[0]),
          raw: target.files[0],
        });
    }
    

    return ( 
        <section className={`${styles.photoPost} animeLeft`}>
            <Head title="Post your photo" />
            <form onSubmit={handleSubmit}>
                <Input label="Name" type="text" name="name" {...name} />
                <Input label="Weight" type="number" name="weight" {...weight} />
                <Input label="Age" type="number" name="age" {...age} />
                <Input label="Subtitle" type="text" name="subtitle" {...subtitle} />
                <input
                    className={styles.file}
                    type="file"
                    name="img"
                    id="img"
                    onChange={handleImgChange}
                />
                {loading ? (
                    <Button disabled>Sending...</Button>
                ) : (
                    <Button>Send</Button>
                )}
                <Error error={error} />
            </form>
            <div>
                {img.preview && (
                    <div
                        className={styles.preview}
                        style={{ backgroundImage: `url('${img.preview}')` }}
                    ></div>
                )}
            </div>
        </section>
    );
};

export default UserPhotoPost;
