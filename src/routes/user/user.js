import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../../App';
import { useParams, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import blank from '../../static/blank.png';
import { useToasts } from 'react-toast-notifications'
import Modal from 'react-modal';

const Message = ({handleSubmit, closeModal}) => {
    return (
        <Formik
            initialValues={{
                message: ""
            }}
            onSubmit={() => handleSubmit()}
        >

            <Form className="flex flex-col space-y-4">
                <span className="flex flex-col space-y-2">
                    <label htmlFor="message" className="text-gray-600 font-bold">Message body</label>
                    <Field name="message" type="text" className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md" />
                </span>
                <button type="submit" className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md">Submit</button>
                <button onClick={closeModal} className="bg-yellow-500 font-semibold text-white px-4 py-2 rounded-md">Cancel</button>
            </Form>
        </Formik>
    )
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function User() {

    let context = useContext(MyContext);
    let params = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { addToast } = useToasts()
    let counsellors = context.counsellors;

    function sendMessage(m){
            setModalOpen(!modalOpen);
            addToast("Message sent successfully", {appearance: "success"});
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

            <div className="flex md:justify-center">
               
                <div className="flex flex-col w-full md:w-1/2 space-y-4 md:space-y-4 md:py-16">
                    {counsellors.map(
                        (c, index) => {
                            return (
                                <div key={`${index}-${c.id}`} className="flex w-full flex-col md:flex-row space-y-4 md:space-x-4 bg-gray-100 rounded-md px-2 md:px-12 p-4 md:py-8">
                                    <div className="flex justify-center md:flex-none md:justify-left md:w-1/4 px-20 px-16 md:px-4 md:py-8">
                                        <img src={blank} alt="avatar" className="rounded-full flex-none" />
                                    </div>
                                    <div className="flex flex-col space-y-2 text-md text-center md:text-left font-light">
                                        <span>{c.fullname}</span>
                                        <span>{c.email}</span>
                                        <p className="text-sm font-semibold">
                                            <span>
                                            <i class="fas fa-map-marker-alt">
                                            </i>
                                            </span>
                                            <span>
                                                {c.location}
                                            </span>
                                        </p>
                                        <span className="flex flex-col space-y-2 md:flex-row md:space-x-2 mt-4 md:mt-0">
                                            <span className="flex justify-center">
                                            <button className="border shadow-lg bg-white font-bold text-sm text-gray-700 px-6 py-2 rounded-md" onClick={() => setModalOpen(!modalOpen)}>
                                                <span><i class="fas fa-envelope"></i></span>
                                                <span>Send message</span>
                                            </button>
                                            </span>
                                           <Modal
                                          style={customStyles}
                                           isOpen={modalOpen}
                                           >
                                                  <Message handleSubmit= {sendMessage} closeModal={()=>setModalOpen(!modalOpen)}/>
                                           </Modal>
                                            <span className="flex justify-center">
                                            <button className="bg-green-500 font-bold text-sm text-white px-6 py-2 rounded-md" onClick={()=>addToast('Chat Request sent', {appearance: "info"})}>
                                                <span><i class="fas fa-video"></i></span>
                                                <span>Request Chat</span>
                                            </button>
                                            </span>
                                           
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