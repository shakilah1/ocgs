import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastProvider} from 'react-toast-notifications';
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <ToastProvider>
            <App />
        </ToastProvider>
    </StrictMode>,
    rootElement
);
