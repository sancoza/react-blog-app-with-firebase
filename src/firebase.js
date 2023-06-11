import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBw6_fEk-cXPAt5fuCNPsT9jOCdz87iORQ',
  authDomain: 'react-blogs-app-8668c.firebaseapp.com',
  projectId: 'react-blogs-app-8668c',
  storageBucket: 'react-blogs-app-8668c.appspot.com',
  messagingSenderId: '851602017674',
  appId: '1:851602017674:web:03f98b171baf45a2544c73',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
