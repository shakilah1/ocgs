import React, { useEffect, useContext, useState } from 'react'
import {MyContext} from '../../App';

export default function Counsellor() {
    let context = useContext(MyContext);
    let consellors = context.consellors;
    let name = useState('');
    return (
        <div className="full">
            <div className="w-full bg-green-600 text-semibold text-white flex space-x-4 px-6 py-4">
                <span className="">
                   {`Hi, ${name}`} 
                </span>
                <span className="flex-auto"></span>
                <span className="">
                    <button className="">Logout</button>
                </span>
            </div>
            <div className="p-2 md:p-6">
                <div className="bg-gray-100">

                </div>
            </div>
        </div>
    )
}