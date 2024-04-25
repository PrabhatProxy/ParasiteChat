import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { authContext } from "../../context/AUthenticationContext";
import Contact from "./contact";
import { chatContext } from "../../context/ChatContext";

function Contacts() {
    const [chats, setChats] = useState({});
    const { currentUser } = useContext(authContext);
    const { dispatch } = useContext(chatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data() || {});
            });
            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
        console.log("changed");
    };

    const chatsArray = Object.entries(chats);
    const chatsSize = chatsArray.length;

    return (
        <div className="contacts">
            {chatsArray.map(([userId, userData], index) => {
                let type;
                if (chatsSize === 1) {
                    type = "single";
                } else if (index === 0) {
                    type = "top";
                } else if (index === chatsSize - 1) {
                    type = "end";
                } else {
                    type = "mid";
                }

                const lastMessage = userData.lastMessage ? userData.lastMessage.text : "Hello! click to start the chat.";

                return (
                    <div onClick={() => handleSelect(userData)} key={userId}>
                        <Contact
                            image={userData.userInfo.photoURL}
                            name={userData.userInfo.displayName}
                            chat={lastMessage}
                            type={type}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default Contacts;
