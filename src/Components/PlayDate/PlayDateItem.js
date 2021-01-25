import React, { useEffect } from 'react'
import styles from './PlayDateItem.module.css';
import Button from '../Forms/Button';
import { EVENT_DELETE, EVENT_PUT } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';

const PlayDateItem = ({ event_post }) => {

    const user = React.useContext(UserContext);

    const { request } = useFetch();
    const joinLabel = "Join";
    const leaveLabel = "Leave PlayDate";
    const [title, setTitle] = React.useState(joinLabel);
    const [owner, setOwner] = React.useState("");

    useEffect(() => {
        const existent = event_post.joined_list.find(el => String(user.data.id) === el);
        const label = (existent) ? leaveLabel : joinLabel;
        setTitle(label); 
        setOwner((event_post.author === user.data.username) ? "You" : event_post.author);
    }, [user.data.id, user.data.username, event_post.author, event_post.joined_list]);

    async function join(event) {
        const formData = JSON.stringify({"id": event_post.id});
        const token = window.localStorage.getItem('token');
        const { url, options } = EVENT_PUT(formData, token);
        const {json} = await request(url, options);
        getUserFromList(String(user.data.id), json);
    };

    function getUserFromList(user_id, data) {
        if(data) {
            const existent = data.joined_list.find(el => user_id === el);
            const label = (existent) ? leaveLabel : joinLabel;
            setTitle(label); 
        }
    }

    async function deletePost() {
        const { url, options } = EVENT_DELETE(event_post.id);
        await request(url, options);
        window.location = "/account/playdate";
    }

    return (
        <li className={styles.event}>
            <div className={styles.content}>
                <div className={styles.titleWrap}>
                    <h1>{event_post.title}</h1>
                    {
                        (event_post.author === user.data.username) && 
                        <button className={styles.deleteButton} onClick={deletePost}>
                            Delete
                        </button>
                    }
                </div>
                <h4 className={styles.description}>{event_post.description}</h4>
                <p className={styles.paragraph}>At {event_post.local}</p>
                <p className={styles.paragraph}>{event_post.date} {event_post.time}</p>
                <p className={styles.paragraph}>author: {owner}</p>
                
                <Button onClick={join}>{title}</Button>
            </div>
        </li>
    );
};

export default PlayDateItem;