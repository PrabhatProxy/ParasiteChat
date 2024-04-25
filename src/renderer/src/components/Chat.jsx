import TopBar from "./Chat/TopBar";
import MessageContainer from "./Chat/MessageContainer";
import BottomBar from "./Chat/BottomBar";

function Chat(){

    return(
        <>
        <div className="chat">
        <TopBar/>
        <MessageContainer/>
        <BottomBar/>
        </div>
        </>
    );
}

export default Chat;