import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    // apiKey: "AIzaSyA8ABw2Q14vdv7X37jF_7mkjNH9-6bt1TM",
    // authDomain: "auth-dev-ce42c.firebaseapp.com",
    // projectId: "auth-dev-ce42c",
    // storageBucket: "auth-dev-ce42c.appspot.com",
    // messagingSenderId: "292712510898",
    // appId: "1:292712510898:web:b3ba5c5cddaa048210e0ab",
    apiKey: "AIzaSyAX25bQOWWwZMZaoamwQgPM2ryr__DOLss",
    authDomain: "auth-prod-805e3.firebaseapp.com",
    projectId: "auth-prod-805e3",
    storageBucket: "auth-prod-805e3.appspot.com",
    messagingSenderId: "161158516106",
    appId: "1:161158516106:web:72dd8b38a22a78864f0c73",
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
