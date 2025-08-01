import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD6LQjkCLuH0be911vM-FR_9ZBv3hDUtmA",
  authDomain: "kaiatune.firebaseapp.com",
  projectId: "kaiatune",
  storageBucket: "kaiatune.firebasestorage.app",
  messagingSenderId: "515792184320",
  appId: "1:515792184320:web:fc283e970769b49b1724e5",
  measurementId:"G-EZ3PG9CFCS"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export const saveMusicToFirebase = async (musicData) => {
//   await addDoc(collection(db, 'music'), musicData);
// };




// src/utils/firebase.js
export const saveMusicToFirebase = async (musicData) => {
  try {
    console.log('Saving to Firestore:', musicData);
    const docRef = await addDoc(collection(db, 'music'), musicData);
    console.log('Document written with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Firebase Save Error:', error);
    throw new Error(`Failed to save to Firestore: ${error.message}`);
  }
};

// firebase.js (add this function)
export const updateMusicOwner = async (tokenId, buyer) => {
  const q = query(collection(db, 'music'), where('id', '==', tokenId));
  const snapshot = await getDocs(q);
  snapshot.forEach(async (doc) => {
    await updateDoc(doc.ref, { owners: arrayUnion(buyer) });
  });
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

// firebase.js (add for debugging)
export const getMusicById = async (tokenId) => {
  const q = query(collection(db, 'music'), where('id', '==', tokenId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
};