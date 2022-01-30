import React from "react";
import style from "./messageBox.module.css";
import { db } from "./firebase_config";
import { doc, deleteDoc } from "firebase/firestore";

const Messages = ({ message, user }) => {

    const deleteMsg = async() => {
        if(message.user !== user) {
            alert("Can't Delete Other's Message!!");
        } else {
             await deleteDoc(doc(db, "messages", message.id))
             .then(res => console.log(res));
        }
    }

    return (
        <>
            {message.user === user ? (
                <div className={style.messageRight}>
                    <p onDoubleClick={() => deleteMsg()}>{message.message}</p>
                <img src={message.imgUrl} alt="" />
                </div>
                ) : 
                <div className={style.messageLeft}>
                    <img src={message.imgUrl} alt="" />
                    <p onDoubleClick={() => deleteMsg()}>{message.message}</p>
                </div>
            }
        </>
    );
};

export default Messages;
