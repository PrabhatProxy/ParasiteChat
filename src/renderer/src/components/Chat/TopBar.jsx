import "../../assets/home.css"
import Defender from "../../assets/defender.png"
import { useContext } from "react";
import { chatContext } from "../../context/ChatContext";

function TopBar() {
    const { data } = useContext(chatContext);

    return (
        <div className="TopBar">
            <div className="contactInfo">
                {data.chatId != 'null' && (
                    <>
                        <img src={data.user?.userInfo.photoURL} alt="User Avatar" />
                        <div>
                            <h3>{data.user?.userInfo.displayName}</h3>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TopBar;