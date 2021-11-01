import React, { useContext, useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { Link, useHistory } from 'react-router-dom';
import { MyContext } from '../../App'

const UserLoginForm = ({ handleSubmit }) => {
    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            <Form className="flex flex-col space-y-4 bg-gray-100 px-8 py-8 rounded-md">
                <span className="flex">
                    <h3 className="text-2xl font-light text-gray-600">Sign in as User</h3>
                </span>
                <span className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-gray-600 font-bold">Email</label>
                    <Field name="email" type="email" className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md" />
                </span>
                <span className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-gray-600 font-bold">Password</label>
                    <Field name="password" type="password" className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md" />
                </span>
                <span className="flex">
                    <button type="submit" className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md">Submit</button>
                </span>
                <span className="flex space-x-2 font-light">
                    <span> Don't have an account?</span>
                    <span><Link to="/register" className="font-bold">Register</Link></span>
                </span>
            </Form>
        </Formik>
    )
}

const CounsellorLoginForm = ({ handleSubmit }) => {

}
export default function Login() {
    let context = useContext(MyContext);
    let users = context.users;
    let keys_users = Object.keys(users);
    useEffect(()=>{console.log(keys_users)});
    let [error, setError] = useState('');
    let history = useHistory()

    const login = (values) => {
          let index = 0;
          while(index < keys_users.length){
               if(values.email === users[keys_users[index]].email && values.password === users[keys_users[index]].password) history.push(`/users/${users[keys_users[index]].id}`)
               error = "User doesn't exist";
               index++;
          }
    }
    return (
        <div className="flex flex-col space-y-8">
            <div className="flex mx-8 my-16">
            <Link to="/" className="font-bold text-green-500">Back to Home </Link>
            </div>
           
            
            <div className=" flex justify-center">
                <UserLoginForm handleSubmit={login} />
            </div>
            <div className="flex justify-center">
                   <span className="font-light  text-red-500 flex text-center">
                      {error}
                    </span>
            </div>
        </div>
    )
}