import { initializeApp, FirebaseOptions } from "firebase/app";
import { getStorage } from "firebase/storage";
import Constants from 'expo-constants';

const firebaseConfig: FirebaseOptions = {
    apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY as string,
    authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN as string,
    projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID as string,
    storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID as string,
    appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID as string,
    measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID as string,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);