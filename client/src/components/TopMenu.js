import React from 'react'

import { FiUser } from "react-icons/fi";
import { AppContext } from '../store';

export default function TopMenu() {

   

    return (
        <div className="top-menu">
            <div className="profile pill">
                <span className="icon">
                    <FiUser></FiUser>
                </span>    
                <span className="name">
                    Ankur Kushwaha
                </span>
            </div>
            <div className="upgrade pill">
                Upgrade
            </div>
        </div>
    )
}
