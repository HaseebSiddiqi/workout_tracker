
import { Link } from "react-router-dom"

export default function Navbar({handleSignOut, setActiveComponent, username}) {
    return (
        <nav className="nav">
            <Link to="/" className="site-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            MUSCLE UP <img src="/strong.png" alt="Logo" style={{ width: "48px", height: "48px" }} />
            </Link>                
                <p> Welcome {username.charAt(0).toUpperCase() + username.slice(1)} </p>
                
                
                <button  onClick={handleSignOut}>
                   Sign Out
               </button>
               
           
    </nav>
    )
}


