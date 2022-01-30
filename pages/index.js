import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Auth from "../components/Auth";
import Chat from "../components/Chat";
import styles from '../styles/Home.module.css';
import { auth } from '../components/firebase_config';
import { useAuthState } from "react-firebase-hooks/auth";


export default function Home() {
  
  const [user] = useAuthState(auth);

  return (
    <div className={styles.container}>
            {user ? <Chat user={user}></Chat> : <Auth></Auth>}
    </div>
  )
}
