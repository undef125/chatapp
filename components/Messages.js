import React from "react";
import style from "./messageBox.module.css";
import { db } from "./firebase_config";
import { doc, deleteDoc } from "firebase/firestore";

const Messages = ({ message, user }) => {
    const deleteMsg = async () => {
        if (message.user !== user) {
            alert("Can't Delete Other's Message!!");
        } else {
            await deleteDoc(doc(db, "messages", message.id));
        }
    };

    return (
        <>
            {message.user === user ? (
                <div className={style.messageRight}>
                    <p onDoubleClick={() => deleteMsg()}>{message.message}</p>
                    <img src={message.imgUrl} alt="" />
                </div>
            ) : (
                <div className={style.messageLeft}>
                    <div className={style.imgHolder}>
                        <span className={style.userName}>{message.user}</span>
                        <img src={message.imgUrl} alt="" />
                    </div>
                    <p onDoubleClick={() => deleteMsg()}>{message.message}</p>
                </div>
            )}
        </>
    );
};

export default Messages;
