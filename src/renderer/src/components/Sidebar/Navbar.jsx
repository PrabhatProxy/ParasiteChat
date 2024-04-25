import { signOut } from "firebase/auth";
import "../../assets/home.css"
import { auth } from "../../firebase";
import { useContext } from "react";
import { authContext } from "../../context/AUthenticationContext";

function Navbar(){

    const {currentUser} = useContext(authContext)

    return(
        <>
        <div className="navbar">
            <img src={currentUser.photoURL}/>
            <div><p className="name">{currentUser.displayName}</p></div>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
        </>
    );
}

export default Navbar;