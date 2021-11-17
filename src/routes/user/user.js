import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link, useHistory } from "react-router-dom";
import { MyContext } from "../../App";
import { Formik, Form, Field } from "formik";
import blank from "../../static/blank.png";
import { useToasts } from "react-toast-notifications";
import Modal from "react-modal";
import { useAuth } from "reactfire";
import { Redirect } from "react-router-dom";
import {
  useSigninCheck,
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreCollection,
  useUser,
} from "reactfire";
import {
  doc,
  setDoc,
  collection,
  getFirestore,
  query,
  orderBy,
  where,
  addDoc,
} from "firebase/firestore";
import LoadingSpinner from "../components/loadingSpinner";

// message form...
const Message = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        message: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form className="flex flex-col space-y-4">
        <span className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-gray-600 font-bold">
            Message body
          </label>
          <Field
            name="message"
            type="text"
            className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md"
          />
        </span>
        <button
          type="submit"
          className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

//reply
const ReplyForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        message: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form className="flex flex-col space-y-4">
        <span className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-gray-600 font-bold">
            Reply body
          </label>
          <Field
            name="message"
            type="text"
            className="px-4 py-2 text-gray-700 border-2 border-gray-600 text-gray-700 font-semibold rounded-md"
          />
        </span>
        <button
          type="submit"
          className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md"
        >
          Reply
        </button>
      </Form>
    </Formik>
  );
};

//modal styles...
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//reply..
const Reply = (message_id) => {
  const repliesCollection = collection(useFirestore(), "replies");
  const replies_query = query(repliesCollection);
  const { data: replies, status } = useFirestoreCollectionData(replies_query);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex shadow-md rounded-md px-4 py-2 bg-gray-100">
      <p>{}</p>
    </div>
  );
};

export default function User() {
  const match = useRouteMatch();
  const history = useHistory();
  const firestore = useFirestore();
  const [isOpen, setIsOpen] = useState(false);
  const [replyRef, setReplyRef] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToasts();
  let auth = useAuth();
  const { userStatus, data: user } = useUser();

  //users...
  const usersCollection = collection(useFirestore(), "users");
  const usersQuery = query(usersCollection, orderBy("name", "asc"));
  const { status, data: users } = useFirestoreCollectionData(usersQuery, {});

  //messages...
  const messagesCollection = collection(useFirestore(), "messages");
  const messagesQuery = query(messagesCollection, orderBy("body", "asc"));
  const { message_status, data: messages } = useFirestoreCollectionData(
    messagesQuery,
    { idField: "id" }
  );
  //

  function sendMessage(m) {
    addToast("Request sent successfully", { appearance: "success" });
  }

  function handleMessageSubmit(values, sender_id, receiver_id) {
    //add to firestore...
    addDoc(messagesCollection, {
      body: values.message,
      sender_id: sender_id,
      receiver_id: receiver_id,
      replies: [],
    });

    //close modal...
    setModalOpen(false);
    history.push('/user/messages')
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const logout = async (auth) => {
    auth.signOut().then(() => <Redirect to="/login" />);
  };

  return (
    <Switch>
      <Route path={match.path} exact={true}>
        <div>
          <div className="bg-green-500 px-6 py-4 flex">
            <span className="font-bold text-white">OCGS</span>
            <div className="flex space-x-2 text-white ml-2">
              <span className="flex">
                <Link to="/user" className="flex space-x-2 text-white">
                  <span>
                    <i class="fas fa-users"></i>
                  </span>
                  <span>People</span>
                </Link>
              </span>

              <span className="flex">
                <Link to="/user/messages" className="flex space-x-2 text-white">
                  <span>
                    <i class="fas fa-comment-alt"></i>
                  </span>
                  <span>messages</span>
                </Link>
              </span>
            </div>
            <button
              className="flex space-x-2 bg-white px-4 py-2 shadow-lg rounded-md"
              onClick={() => {
                openModal();
              }}
            >
              <span>
                <i class="fas fa-comment-alt"></i>
              </span>
              <span>Send message</span>
            </button>
            <span className="flex-auto"></span>
            <p className="text-white flex space-x-2 mr-4">
              <span> Hi,</span>
              <span></span>
            </p>
            <button
              onClick={() => {
                logout(auth);
              }}
              className="text-sm font-light"
            >
              Logout
            </button>
          </div>

          <div className="flex md:justify-center">
            <div className="flex flex-col w-full md:w-1/2 space-y-4 md:space-y-4 md:py-16">
              {status === "loading" ? (
                <LoadingSpinner />
              ) : (
                <div>
                  {users.map((u, index) => (
                    <div
                      key={index}
                      className="flex flex-col space-y-4 lg:space-y-8 md:space-x-4 shadow-md p-2 md:px-8 md:py-4"
                    >
                      <div className="flex flex-col md:flex-row space-y-2 md:space-x-4">
                        <img
                          src={blank}
                          alt="avatar"
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-col">
                          <span>{u.name}</span>
                        </div>
                      </div>
                      <div
                        id="actions"
                        className="flex flex-col md:flex-row space-2 md:space-x-4"
                      >
                        {/**
                         * Modal
                         */}

                        <Modal
                          isOpen={modalOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                          <div className="flex w-full justify-end">
                            <button
                              onClick={() => {
                                closeModal();
                              }}
                            >
                              <span>
                                <i class="far fa-window-close"></i>
                              </span>
                              <span>close</span>
                            </button>
                          </div>
                          <Message
                            handleSubmit={(values) =>
                              handleMessageSubmit(values, user.uid, u.id)
                            }
                          />
                        </Modal>

                        <button
                          onClick={() => {
                            sendMessage();
                          }}
                          className="flex space-x-2 bg-green-600 px-4 py-2 rounded-md"
                        >
                          <span>
                            <i class="fas fa-video"></i>
                          </span>
                          <span>Request chat</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Route>
      <Route path={`${match.path}/messages`}>
        <div className="flex flex-col">
          <div className="bg-green-500 px-6 py-4 flex">
            <span className="font-bold text-white">OCGS</span>
            <div className="flex space-x-2 text-white ml-2">
              <span className="flex">
                <Link to="/user" className="flex space-x-2 text-white">
                  <span></span>
                  <span>People</span>
                </Link>
              </span>

              <span className="flex">
                <Link to="/user/messages" className="flex space-x-2 text-white">
                  <span>
                    <i class="fas fa-comment-alt"></i>
                  </span>
                  <span>messages</span>
                </Link>
              </span>
            </div>
            <span className="flex-auto"></span>
            <p className="text-white flex space-x-2 mr-4">
              <span> Hi,</span>
              <span></span>
            </p>
            <button
              onClick={() => {
                logout(auth);
              }}
              className="text-sm font-light"
            >
              Logout
            </button>
          </div>
          <div id="messages-wrapper" className="flex flex-col w-full">
            <div className="flex w-full">
              <div className="flex flex-col">
                {messages &&
                  messages.map((message, index) => (
                    <div className="flex flex-col space-y-4" key={index}>
                      <span className="flex justify-start p-4">
                        <p className="flex flex-col space-y-2 shadow-md rounded-md px-4 py-2 bg-green-100">
                          <span className="p-4">{message.body}</span>
                        </p>
                      </span>
                      <span className="flex justify-end p-2"></span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Route>
    </Switch>
  );
}
