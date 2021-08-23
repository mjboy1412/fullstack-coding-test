import * as firebaseAdmin from "firebase-admin";

import { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, FIREBASE_DATABASE_URL } from "config";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: FIREBASE_PRIVATE_KEY,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      projectId: FIREBASE_PROJECT_ID,
    }),
    databaseURL: FIREBASE_DATABASE_URL,
  });
}

const auth = firebaseAdmin.auth();

export { firebaseAdmin, auth };
