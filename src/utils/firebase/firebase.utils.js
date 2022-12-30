import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrkEd9eoOzTgag5zidC4YkeKagcL2noXc",
  authDomain: "mealplan-clothing.firebaseapp.com",
  projectId: "mealplan-clothing",
  storageBucket: "mealplan-clothing.appspot.com",
  messagingSenderId: "53012945805",
  appId: "1:53012945805:web:f1d22d47e092ae749cfbc4"
};

// initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = Date.now();

    try {
      await setDoc(userDocRef, {displayName, email, createdAt})
    } catch(error) {
      console.log('Error while creating user', error);
    }
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithEmailPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
}