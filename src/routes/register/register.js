import React, { useContext, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useHistory, Link } from "react-router-dom";
import { useAuth, useFirestore } from "reactfire";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc  } from 'firebase/firestore';
//context provider
import { MyContext } from "../../App.js";

const UserForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      <Form className="flex flex-col space-y-6 p-2 md:p-4">
        <span className="flex flex-col">
          <label htmlFor="fullname">Full Name</label>
          <Field
            name="fullname"
            type="text"
            className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md"
          />
        </span>

        <span className="flex flex-col">
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="email"
            className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md"
          />
        </span>

        <span className="flex flex-col">
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md"
          />
        </span>
        <span>
          <button
            type="submit"
            className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md w-1/2"
          >
            Submit
          </button>
        </span>

        <p className="flex space-x-2">
          <span> Already Have an account, </span>
          <Link to="/login" className="text-green-500">
            Login
          </Link>
        </p>
      </Form>
    </Formik>
  );
};

export default function Register() {
  let history = useHistory();
  let auth = useAuth();
  useEffect(() => {
    document.title = "OCGS - Register";
  });


  let usersCollection = collection(useFirestore(), 'users')

  const registerUser = async (values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((result) => {
        //add result to firestore...
       // console.log(result.user)
        addDoc(usersCollection, {id: result.user.uid, name:values.fullname, email: result.user.email});
      })
      .catch((error) => console.log(error));
    
  
  };
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex mx-8 my-16">
        <Link to="/" className="font-bold text-green-500">
          Back to Home{" "}
        </Link>
      </div>

      <div className="flex justify-center">
        <UserForm handleSubmit={registerUser} />
      </div>
    </div>
  );
}
