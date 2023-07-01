import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(undefined);
    

    async function getLoggedIn(){
        const response = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/loggedIn`,
            {
                withCredentials: true,
            }
        );
        // console.log(response.data);
        setIsLoggedIn(response.data);
    }

    useEffect(()=>{
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };
