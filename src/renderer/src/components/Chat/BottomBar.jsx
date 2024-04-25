import { useContext, useState } from "react";
import { chatContext } from "../../context/ChatContext";
import { authContext } from "../../context/AUthenticationContext";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

function BottomBar(){

    const { data } = useContext(chatContext);
    const {currentUser} = useContext(authContext);

    const [text,setText] = useState("")

    const handleSend = async ()=>{
        console.log(data)
        await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now()
            }),
        });
        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId+".lastMessage"]:{
                text,
            }
        })
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSend();
    }
    return(
        <>
        <div className="BottomBar">
        <input type="text" placeholder="Type your message..." onKeyDown={handleKey} onChange={(e)=>setText(e.target.value)}/>
        <button onClick={handleSend}>Send</button>
        </div>
        </>
    );
}

export default BottomBar;