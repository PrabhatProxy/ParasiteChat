function Contact(props){

    function handleSelect()
    {

    }
    return(
        <>
        <div className={"contact " + props.type} onClick={handleSelect}>
            <img src={props.image}/>
            <div><p className="name">{props.name}</p><p className="cht">{props.chat}</p></div>
        </div>
        </>
    );
}

export default Contact;