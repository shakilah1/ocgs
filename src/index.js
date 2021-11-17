import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseAppProvider} from 'reactfire'
import "./styles.css";

const firebaseConfig = {
    apiKey: "AIzaSyDNtHokyfbls_q-vr_H-IHDClzW9Fi3D9E",
    authDomain: "ocgs-6d18f.firebaseapp.com",
    projectId: "ocgs-6d18f",
    storageBucket: "ocgs-6d18f.appspot.com",
    messagingSenderId: "864076395036",
    appId: "1:864076395036:web:71e365e72d8266f6bca5d9",
    measurementId: "G-D1L1MWF72B",
  };
  
const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </StrictMode>,
  rootElement
);
