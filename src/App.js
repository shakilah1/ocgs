import React, { useState, useEffect} from 'react';
import "./styles.css";
import { BrowserRouter } from 'react-router-dom'
//routes
import Routes from './routes'
//Context
let MyContext = React.createContext();

export default function App() {

  let users = useState([]);
  let consellors = useState([]);
  
  return (
   <MyContext.Provider value={{
         
   }}>
       <BrowserRouter>
        <Routes />
    </BrowserRouter>
   </MyContext.Provider>
   
  );
}
