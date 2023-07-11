import React, { useEffect, useState } from 'react';
import axios from "axios";
import Menu from './menu.js';

const ParentComponent = (handleMenuItemClick, style) => {
    const [isAdmin, setIsAdmin] = useState(false);

    async function isAdminLoggedIn(){
        const response = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/adminauth`,
            {
                withCredentials: true,
            }
        );
        // console.log(response.data);
        setIsAdmin(response.data);
    }

    useEffect(()=>{
        isAdminLoggedIn();
    }, []);
    return (
        <div>
        <Menu handleMenuItemClick = {handleMenuItemClick} isAdmin={isAdmin} style={style} />
        </div>
    );
};

export default ParentComponent;
