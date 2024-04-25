import { useState, useContext } from "react";

import { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Contact from "./contact";
import Contacts from "./contacts";
import { authContext } from "../../context/AUthenticationContext";
import { createSearchParams } from "react-router-dom";


function Search() {

    const [displayName, setdisplayName] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const {currentUser} = useContext(authContext)
    
    function setContactVisible(isVisible){
        const contactsElement = document.querySelector('.contacts');
        if (isVisible) {
            contactsElement.style.height = '60vh';
        } else {
            contactsElement.style.height = '70vh';
        }
    }

    const handleSearch = async () => {
        try {
            // Query users based on displayName
            const q1 = query(
                collection(db, "users"),
                where("displayName", "==", displayName)
            );
            const querySnapshot1 = await getDocs(q1);
            
            // Query users based on email
            const q2 = query(
                collection(db, "users"),
                where("email", "==", displayName)
            );
            const querySnapshot2 = await getDocs(q2);
    
            // Merge the results from both queries
            const mergedSnapshot = [...querySnapshot1.docs, ...querySnapshot2.docs];
    
            if (mergedSnapshot.length > 0) {
                setUser(mergedSnapshot[0].data()); // Set the first user found
                setContactVisible(true);
            } else {
                setUser(null);
                setContactVisible(false);
            }
        } catch (err) {
            setErr(true);
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setdisplayName(inputValue);
        if (inputValue.trim() === "") {
            setUser(null);
            setContactVisible(false);
        }
    };

    async function handleSelect()
    {
        console.log("worksada")
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try{

            const res = await getDoc(doc(db,"chats",combinedId));

            if(!res.exists()){
                await setDoc(doc(db,"chats",combinedId),{messages:[]});

                await updateDoc(doc(db,"userChats",currentUser.uid),{
                    [combinedId+".userInfo"]:{
                        uid:user.uid,
                        displayName:user.displayName,
                        photoURL:user.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp()
                })
                await updateDoc(doc(db,"userChats",user.uid),{
                    [combinedId+".userInfo"]:{
                        uid:currentUser.uid,
                        displayName:currentUser.displayName,
                        photoURL:currentUser.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp()
                })
            }
        }
        catch{

        }

        setUser(null)
    }

    return (
        <>
            <div className="search">
                <input type="text" placeholder="search" onKeyDown={handleKey} onChange={handleInputChange} />
                {user && <div onClick={handleSelect}><Contact image={user.photoURL} name={user.displayName} chat="Hello! click to start the chat." type="single"/></div>}
                <Contacts/>
            </div>
        </>
    );
}

export default Search;