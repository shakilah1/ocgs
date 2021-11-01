import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../../App';
import { useParams, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import blank from '../../static/blank.png';

const Message = (handleSubmit) => {
    return (
        <Formik
            initialValues={{
                message: ""
            }}
            onSubmit={(values) => { handleSubmit(values) }}
        >

            <Form className="flex flex-col space-y-4">
                <span className="flex flex-col space-y-2">
                    <label htmlFor="message" className="text-gray-600 font-bold">Message body</label>
                    <Field name="message" type="text" className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md" />
                </span>
                <button type="submit" className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md">Submit</button>
            </Form>
        </Formik>
    )
}

const Toast = (message, close) => {
      return(
          <div>
              <button className="" onClick={()=>{close}}></button>
              {message}
          </div>
      )
}
export default function User() {
    let context = useContext(MyContext);
    let params = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    let counsellors = context.counsellors;
    const sendMessage = (m) => {
          setIsOpen(false)
    }

    return (
        <div>
            <div className="bg-green-500 px-6 py-4 flex">
                <span className="font-bold text-white">
                    OCGS
                 </span>
                <span className="flex-auto"></span>
                <p className="text-white flex space-x-2 mr-4">
                    <span> Hi,</span>
                    <span>{name}</span>
                </p>
                <Link to="/login" className="text-sm font-light">Logout</Link>
            </div>
            <div className="flex justify-center py-16"> 
                { isOpen ? <Message handleSubmit={sendMessage}/> : null}
            </div>
            <div className="">
                <span className="">
                    {toastOpen ? <Toast message="Request Sent" close={setToastOpen(!toastOpen)}/> : null}
                </span>
            </div>
            <div className="flex justify-center">
               
                <div className="flex flex-col space-y-4 py-16">
                    {counsellors.map(
                        (c, index) => {
                            return (
                                <div key={`${index}-${c.id}`} className="flex space-x-4 bg-gray-100 rounded-md px-12 py-8">
                                    <div className="">
                                        <img src={blank} alt="avatar" className="rounded-full" width="30" height="30" />
                                    </div>
                                    <div className="flex flex-col space-y-4 text-md font-light">
                                        <span>{c.fullname}</span>
                                        <span>{c.email}</span>
                                        <p className="flex space-x-2"><span><i class="fas fa-map-marker-alt"></i></span><span>{c.location}</span></p>
                                        <span className="flex space-x-2">
                                            <button className="flex space-x-2 border shadow-lg bg-white font-bold text-sm text-gray-700 px-6 py-2 rounded-md" onClick={() => setIsOpen(!isOpen)}>
                                                <span><i class="fas fa-envelope"></i></span>
                                                <span>Send message</span>
                                            </button>
                                            <button className="flex space-x-2 bg-green-500 font-bold text-sm text-white px-6 py-2 rounded-md" onClick={()=>setToastOpen(true)}>
                                                <span><i class="fas fa-video"></i></span>
                                                <span>Request Chat</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
}