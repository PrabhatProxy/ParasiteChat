function TextMsg(props){

    return(
        <>
        <div className="getmsg"></div>
        <div className={props.type}> {props.msg}</div>
        </>
    );
}

export default TextMsg;