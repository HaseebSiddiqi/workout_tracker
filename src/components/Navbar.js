
import { Link } from "react-router-dom"

export default function Navbar({handleSignOut, setActiveComponent, username}) {
    return (
        <nav className="nav">
            <Link to="/" className="site-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            MUSCLE UP
            </Link>                
                <p> Welcome {username} </p>
                
                
                <button  onClick={handleSignOut}>
                   Sign Out
               </button>
               
           
    </nav>
    )
}


