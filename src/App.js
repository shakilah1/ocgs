import "./styles.css";
import { BrowserRouter } from 'react-router-dom'
//routes
import Routes from './routes'
export default function App() {
  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
}
