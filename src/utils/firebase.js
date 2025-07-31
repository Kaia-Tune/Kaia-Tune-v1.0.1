import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';


const firebaseConfig = {

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