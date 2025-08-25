
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
            
            <h1>Home Page</h1>


            <div className="button-container">

            <Link to="/Create_workouts"> 
                <button className='my-button'>Create Workout </button>
            </Link>    
           

            <Link to="/Add_workouts"> 
                <button className='my-button'>Add Workout</button>
            </Link>

            <Link to="/View_workouts"> 
                <button className='my-button'>View Workouts</button>
            </Link>

            </div>
            
        </>


    )
}