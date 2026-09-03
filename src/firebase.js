// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import {
//   initializeFirestore,
//   persistentLocalCache,
//   persistentMultipleTabManager,
// } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD2vdd6i4Eiaa004RytSGpBnop4ncR7Af0",
//   authDomain: "lectivio-3dd88.firebaseapp.com",
//   projectId: "lectivio-3dd88",
//   storageBucket: "lectivio-3dd88.firebasestorage.app",
//   messagingSenderId: "923689463086",
//   appId: "1:923689463086:web:aa72e0f93294a4a7109ebf",
//   measurementId: "G-3HGX390ML1",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// export const db = initializeFirestore(app, {
//   localCache: persistentLocalCache({
//     tabManager: persistentMultipleTabManager(),
//   }),
// });




// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// // Writes one waitlist submission to the `waitlist` collection.
// export async function submitWaitlistEntry(data) {
//   const ref = collection(db, "waitlist");
//   return addDoc(ref, {
//     ...data,
//     createdAt: serverTimestamp(),
//   });
// }


// Suggested Firestore security rule for this standalone project (allow anyone to create, no one to read/update/delete from the client):
// ```
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /waitlist/{entryId} {
//       allow create: if true;
//       allow read, update, delete: if false;
//     }
//   }
// }

// **3. Update the Firestore rule** to allow read (still blocks update/delete from clients):
// ```
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /waitlist/{entryId} {
//       allow create: if true;
//       allow read: if true;
//       allow update, delete: if false;
//     }
//   }
// }


import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLIEnUTggjb9IxOJQoUohOkdt983SwdfA",
  authDomain: "lectivio-wait-list.firebaseapp.com",
  projectId: "lectivio-wait-list",
  storageBucket: "lectivio-wait-list.firebasestorage.app",
  messagingSenderId: "801823077720",
  appId: "1:801823077720:web:5bd314150e0a06c250612d",
  measurementId: "G-SPDPG8WYKHvb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function submitWaitlistEntry(data) {
  const ref = collection(db, "waitlist");
  return addDoc(ref, { ...data, createdAt: serverTimestamp() });
}

// Fetches all waitlist entries, newest first.
export async function getWaitlistEntries() {
  const q = query(collection(db, "waitlist"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}