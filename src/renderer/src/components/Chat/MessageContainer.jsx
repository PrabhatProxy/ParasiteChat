import { useContext, useEffect, useState } from "react";
import { chatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import TextMsg from "./Message";
import { authContext } from "../../context/AUthenticationContext";

function MessageContainer(){

    const { data } = useContext(chatContext);
    const {currentUser} = useContext(authContext);

    const [messages,setMessages] = useState([]);

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        })
        return ()=>{
            unSub()
        }
    },[data.chatId])

    return(
        <>
        <div className="MessageContainer">
            {
                messages.map(m=>(
                    <div key={m.id}>
                    {m.senderId === currentUser.uid ? (
                        <TextMsg msg={m.text} type="msgsend" />
                    ) : (
                        <TextMsg msg={m.text} type="msgrecieve" />
                    )}
                    </div>
                ))
            } 
        </div>
        </>
    );
}

export default MessageContainer;