import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {
  FIREBASE_API_KEY,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_PROJECT_ID,
  FIREBASE_DATABASE_URL,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID,
} from "config";

const CLIENT_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(CLIENT_CONFIG);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebase;
}

export { firebase };
