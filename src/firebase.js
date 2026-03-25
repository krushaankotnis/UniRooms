import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3CI2cmSFlGjOK1g81kUcUNFgx1vFi-uc",
  authDomain: "unirooms-86d45.firebaseapp.com",
  projectId: "unirooms-86d45",
  storageBucket: "unirooms-86d45.appspot.com", // ✅ fixed
  messagingSenderId: "147374736756",
  appId: "1:147374736756:web:4c21872d251a8b59ca9821",
  measurementId: "G-Y24S7DVV1W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };
export default app;
