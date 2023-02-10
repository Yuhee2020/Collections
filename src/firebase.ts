import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyAKaXtu_fvZKEVvH09tuSu12SDPNbLbR3Y",
    authDomain: "collections-7d02e.firebaseapp.com",
    projectId: "collections-7d02e",
    storageBucket: "collections-7d02e.appspot.com",
    messagingSenderId: "903078136286",
    appId: "1:903078136286:web:5854267450841eba32754f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);