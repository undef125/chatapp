import React, { useRef } from "react";
import { signIn, auth } from "./firebase_config";
import styles from "./auth.module.css";

const Auth = () => {

    const emailInp = useRef(null);
    const passwordInp = useRef(null);

    const signInUser = async () => {
        try {
            const res = await signIn(emailInp.current.value, passwordInp.current.value);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={styles.signUpSec}>
            <h3>Sign in to chat!</h3>
            <div className={styles.emailHolder}>
                <input
                    ref={emailInp}
                    type="email"
                    placeholder="Email"
                />
            </div>
            <div className={styles.passwordHolder}>
                <input
                    ref={passwordInp}
                    type="password"
                    placeholder="Password"
                    onKeyPress={(e) => {
                        if(e.key === "Enter") sendMsg();
                    }}
                />
            </div>
            <button onClick={() => signInUser()} className={styles.signInBtn}>Sign In</button>
            <p className={styles.lastP}>Just a simple chatting nothing fancy with the firebase as database. Thamks!</p>
        </div>
    );
};

export default Auth;
