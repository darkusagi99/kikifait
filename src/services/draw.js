import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/** Component for draw elements */
const firebaseConfig = {
  apiKey: "AIzaSyC7I4Psy8yMXZpjEC8-e3Pa12kUQysuK5U",
  authDomain: "kikifait-377cf.firebaseapp.com",
  databaseURL: "https://kikifait-377cf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kikifait-377cf",
  storageBucket: "kikifait-377cf.appspot.com",
  messagingSenderId: "17879837210",
  appId: "1:17879837210:web:e960cb6af201d57bec3fa3"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
