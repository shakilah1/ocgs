import React, {useContext} from 'react'
import { MyContext } from '../../App';


function Messages() {
    let context = useContext(MyContext);
    return (
        <div className="">
            <div className="">

            </div>

            <div className="">
                {/***This is where messages will go... */}

            </div>
            
        </div>
    )
}

export default Messages;
