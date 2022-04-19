import styles from "./styles.module.scss";

import {api} from '../../services/api';

import Logo from '../../assets/Logo.svg'
import { useEffect, useState } from "react";

type Message = {
    id: string;
    text: string;
    user:{
        name: string;
        avatar_url:string;
    }
}

export function  MessageList(){
    const [messages, setMessages] = useState<Message[]> ([])

    useEffect(()=>{
        api.get<Message[]>('messages/last3').then(response=>{
            setMessages(response.data);
        })
    },[]);

    return(
        <div className={styles.MessageListWrapper}>
            <img src={Logo} alt="DoWhile 2021" />
            <ul className={styles.messageList}>
            {messages.map(message=>{
                return(
                <li key={message.id} className={styles.message}>
                    <p className={styles.messageContent}>{message.text}</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src={message.user.avatar_url} alt={message.user.name} />
                        </div>
                        <span>
                            {message.user.name}
                        </span>
                    </div>
                </li>
                )
            })}
            </ul>
        </div>
    )
}