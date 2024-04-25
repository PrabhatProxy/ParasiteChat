import Navbar from "./Sidebar/Navbar";
import Search from "./Sidebar/Search";
import Contacts from "./Sidebar/contacts";

function Sidebar(){

    return(
        <>
        <div className="sidebar">
        <div className="logo">Parasite</div>
        <Search/>
        <Navbar/>
        </div>
        </>
    );
}

export default Sidebar;