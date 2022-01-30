import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA8ABw2Q14vdv7X37jF_7mkjNH9-6bt1TM",
    authDomain: "auth-dev-ce42c.firebaseapp.com",
    projectId: "auth-dev-ce42c",
    storageBucket: "auth-dev-ce42c.appspot.com",
    messagingSenderId: "292712510898",
    appId: "1:292712510898:web:b3ba5c5cddaa048210e0ab",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export function signOut() {
    return auth.signOut();
}
export const db = getFirestore();