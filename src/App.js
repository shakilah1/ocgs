import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getFirestore
} from "@firebase/firestore";
import {
  AuthProvider,
  FirestoreProvider,
  useFirebaseApp,
  useFirestore,
} from "reactfire";
import { ToastProvider } from "react-toast-notifications";
//routes
import Routes from "./routes";

//Context
export const MyContext = React.createContext();

export default function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestoreInsatance = getFirestore(app);
  return (
    <FirestoreProvider sdk={firestoreInsatance}>
      <AuthProvider sdk={auth}>
        <ToastProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}
