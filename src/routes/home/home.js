import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../static/logo.svg";

export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full bg-white text-semibold text-white flex space-x-4 px-6 py-4 shadow-md">
        <span className="font-bold">
          <Logo className="flex w-16 h-16" />
        </span>
        <span className="flex-auto"></span>
        <span>
          <NavLink
            to="/login"
            activeClassName=""
            className="bg-green-600 text-white px-4 py-2 font-semibold rounded-md"
          >
            Login
          </NavLink>
        </span>
      </div>
      <div className="flex justify-center space-y-6 py-8 bg-hero-pattern bg-no-repeate bg-cover b-origin-border h-screen">
        <div className="flex w-full lg:w-1/2 justify-center ">
          <div className="flex flex-col space-y-8 bg-white opacity-90 shadow-md py-4 lg:py-16">
            <h3 className="text-5xl flex flex-col text-center space-y-4">
              <span className=" font-light text-gray-900">Welcome to OCGS</span>
              <span className=" font-bold text-gray-500">
                The best place to get free counselling and guidance!
              </span>
            </h3>

            <span className="flex justify-center">
              <Link
                to="/register"
                className="border-2 border-green-400 text-center py-4 px-6 rounded-md font-semibold"
              >
                Register here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
