import React, { useEffect } from 'react'
import styles from './PlayDateItem.module.css';
import Button from '../Forms/Button';
import { EVENT_DELETE, EVENT_PUT } from '../../Api';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';


//individual cards
const PlayDateItem = ({ event_post }) => {

    const user = React.useContext(UserContext);

    const { request } = useFetch();
    const joinLabel = "Join";
    const leaveLabel = "Leave Play date";
    const [title, setTitle] = React.useState(joinLabel);
    const [owner, setOwner] = React.useState(""); //event owner

    //verify if the user joined the playdate / só 1 vez qnd carrega a página / 
    useEffect(() => {
        const existent = event_post.joined_list.find(el => String(user.data.id) === el);
        const label = (existent) ? leaveLabel : joinLabel; //
        setTitle(label); 
        setOwner((event_post.author === user.data.username) ? "You" : event_post.author); //verifica se o autor do evento é o que está logado. Se for, setta como "you"
    }, [user.data.id, user.data.username, event_post.author, event_post.joined_list]);
    
    //faz um update no post e setta o usuario dentro do array de usuarios - rota na API event_pu = update no DB de acordo com as confirmações de presença
    async function join(event) {
        const formData = JSON.stringify({"id": event_post.id});
        const token = window.localStorage.getItem('token');
        const { url, options } = EVENT_PUT(formData, token);
        const {json} = await request(url, options);
        getUserFromList(String(user.data.id), json); //verifica se o cara ta na lista e se tiver ele setta o label
    };


    function getUserFromList(user_id, data) {
        if(data) {
            const existent = data.joined_list.find(el => user_id === el);
            const label = (existent) ? leaveLabel : joinLabel;
            setTitle(label); 
        }
    }

    //delete the route
    async function deletePost() {
        const { url, options } = EVENT_DELETE(event_post.id);
        await request(url, options);
        window.location = "/account/playdate"; // redirect to playdate section
    }

    return (
        <li className={styles.event}>
            <div className={styles.content}>
                <div className={styles.titleWrap}>
                    <h1>{event_post.title}</h1>
                    {
                        (event_post.author === user.data.username) &&  //verifica se é autor ou não, se não é autor, não tem botão de delete
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