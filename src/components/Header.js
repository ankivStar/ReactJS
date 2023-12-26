import { useState, useEffect } from "react";
import {LOGO_URL} from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
    const [btnName, setbtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();

    // if no dependency array => useEffect is called on every render
    // if dependency array is empty = [] => useEffect is called on initial render(just once)
    // if dependecy array is [btnName] => called everytime btnName is updated 

    useEffect(()=>{
    }, [btnName])
    
    return (
        <div className="flex justify-between bg-pink-100 shadow-lg m-2">
            <div className="logo-container"> 
                <img className="w-36" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online Status : {onlineStatus ? "✅" : "🔴"}</li>
                    <li className="px-4">
                        <Link to="/">Home</Link></li>
                    <li className="px-4">
                        <Link to="/about">About us</Link></li>
                    <li className="px-4">
                       <Link to="/contact">Contact us</Link></li>
                    <li className="px-4">
                       <Link to="/grocery">Grocery</Link></li>
                    <li className="px-4">Cart</li>
                    <button className="px-4" onClick={()=>{btnName === "Login" ?setbtnName("Logout") : setbtnName("Login")}}>{btnName}</button>
                </ul>
            </div>
        </div>
    ) 
};

export default Header;