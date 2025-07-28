import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// import * as dotenv from 'dotenv';

// // Load environment variables from .env
// dotenv.config();

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, 
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveMusicToFirebase = async (musicData) => {
  await addDoc(collection(db, 'music'), musicData);
};

export const getMusicList = async () => {
  const q = query(collection(db, 'music'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserMusic = async (account) => {
  const q = query(collection(db, 'music'), where('creator', '==', account));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserEarnings = async (account) => {
  const music = await getUserMusic(account);
  const earnings = music.reduce((sum, m) => sum + (m.owners.length - 1) * m.price * 0.7, 0);
  return earnings;
};