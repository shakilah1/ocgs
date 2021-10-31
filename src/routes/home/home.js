import React from 'react';
import {Link} from 'react-router-dom';

export default function Home(){
       return(
         <div>
               <div>
                <Link to="/">Home</Link>
                <Link to="/register">Signup / Login</Link>
                
               </div>
               <div>
                  <h3>
                  I want to,
                  </h3>
                   <Link to="/">
                        Get conselling
                   </Link>

                    <Link to="/">
                       Give conselling
                   </Link>
               </div>
         </div>
       )
}