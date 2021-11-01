import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
//routes
import Routes from './routes'
//Context
export const MyContext = React.createContext();


export default function App() {
    let dummyConsellors = [
        {
            id: "fgfgfgrcvfdfd",
            fullname: "Benjamin Kalungi",
            location: "Kampala",
            email: "benkalungi@gmail.com",
            bio: "Am ready and willing to offer guidance and counselling to individuals",

            password: null,
            messages: [],
        },
        {
            id: "fgfgfgrcvfdfd",
            fullname: "Kisakye Winnie",
            location: "United Kingdom",
            email: "kw2000@gmail.com",
            bio: "Am ready and willing to offer guidance and counselling to individuals",

            password: null,

        },
        {
            id: "fgfgfgrcvfdfd",
            fullname: "Ayodeji Awosika",
            location: "Lagos, Nigeria",
            email: "ayotheauthor@gmail.com",
            bio: "Am ready and willing to offer guidance and counselling to individuals",

            password: null,

        },
        {
            id: "fgfgfgrcvfdfd",
            fullname: "Gilbert Mpanga",
            location: "Kampala",
            email: "gilbertMpanga12@gmail.com",
            bio: "Am ready and willing to offer guidance and counselling to individuals",

            password: null,

        }
    ]

    let dummyUsers = [
        {
            id: "87457847584",
            fullname: "James Bond",
            email: "james@yahoo.com",
            password: "yesyes..."
        },
        {
            id: "6565665656565",
            fullname: "Emmy Lanna",
            email: "emmylana@yahoo.com",
            password: "yesyes..."
        }
    ]

    let [messages, setMessages] = useState([])
    let [users, setUsers] = useState(dummyUsers);
    let [counsellors, setCounsellors] = useState(dummyConsellors);
     
    function getName(id){
        let keys_u = Object.keys(users)
             let index = 0;
             while(index < keys_u.length){
                 let u_name = users[keys_u[index]];
                 if(id === users[keys_u[index]].id){
                    return u_name;
                 }
                 index++
             }
    }
    return (
        <MyContext.Provider value={{
            addUser: (data) => { setUsers([...dummyUsers, data]) },
            addCounsellors: (data) => { setCounsellors([...dummyCounsellors, data]) },
            getName: getName,
            users: users,
            counsellors: counsellors,
        }}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </MyContext.Provider>

    );
}
