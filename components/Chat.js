import React, { useEffect, useRef, useState } from "react";
import style from "./chat.module.css";
import { auth, db } from "./firebase_config";
import {
    collection,
    addDoc,
    Timestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import Messages from "./Messages";

const Chat = (props) => {

    //set profile img
    let profile;
    if(props.user.email.split("@")[0] === "user1") {
        profile = "https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"
    } else if(props.user.email.split("@")[0] === "user2") {
        profile = "https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
    } else {
        profile = "https://image.shutterstock.com/image-vector/unknown-person-icon-anonymous-pictogram-260nw-1391394830.jpg"
    }

    //************************************************ */
    const msgRef = useRef(null);
    const dummyForScroll = useRef();
    const [messages, setMessages] = useState([]);

    //getting messages from the database
    const getMsg = () => {
        const msgCol = collection(db, "messages");
         onSnapshot(
            query(collection(db, "messages"), orderBy("timestamp")),
            (snapshot) => {
                const msgs = [];
                snapshot.forEach((doc) => {
                    msgs.push(doc);
                });
                setMessages(
                    msgs.map((doc) => ({
                        user: doc.data().user,
                        imgUrl: doc.data().imageUrl,
                        message: doc.data().message,
                        id: doc.id,
                    }))
                );
            }
        );
        dummyForScroll.current?.scrollIntoView({ behaviour: "smooth" });
    };

    useEffect(() => {
        getMsg();
    }, []);


    //sending message to the database
    const sendMsg = async () => {
        const res = await addDoc(collection(db, "messages"), {
            imageUrl: profile,
            message: msgRef.current.value,
            user: props.user.email.split("@")[0],
            timestamp: Timestamp.now(),
        });
        msgRef.current.value = "";
        dummyForScroll.current?.scrollIntoView({ behaviour: "smooth" });
    };

    const signOutUser = () => {
        auth.signOut();
    }


    return (
        <div className={style.chatPage}>
            <div className={style.headHolder}>
                <div className={style.title}>Chat box!!</div>
                <div className={style.navIconBtn}>
                    <img src={profile} alt="" />
                    <button onClick={() => signOutUser()}>Sign Out</button>
                </div>
            </div>
            <div className={style.chatBoxHolder}>
                <div className={style.top}>
                    {props.user.email.split("@")[0]}
                </div>
                <div className={style.messages}>
                    {messages?.map((msg) => {
                        return (
                            <Messages
                                message={msg}
                                user={props.user.email.split("@")[0]}
                                key={Math.random()}
                            ></Messages>
                        );
                    })}
                    <span ref={dummyForScroll}></span>
                </div>
                <div className={style.sendMsg}>
                    <input
                        type="text"
                        ref={msgRef}
                        onKeyPress={(e) => {
                            if(e.key === "Enter") sendMsg();
                        }}
                    />
                    <img src="./send.png" onClick={() => sendMsg()} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
