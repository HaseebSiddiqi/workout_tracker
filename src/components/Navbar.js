
import { Link } from "react-router-dom"

export default function Navbar({handleSignOut, setActiveComponent, username}) {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">MUSCLE UP</Link>
                
                <p> Welcome {username} </p>
                
                <button onClick={() => setActiveComponent("create")}>
                    Create Workouts
                </button>

                <button onClick={() => setActiveComponent("add")}>
                    Add Workouts
                </button>
                <button onClick={() => setActiveComponent("home")}>
                    View Workouts
                </button>
                
                <button  onClick={handleSignOut}>
                   Sign Out
               </button>
               
           
    </nav>
    )
}


