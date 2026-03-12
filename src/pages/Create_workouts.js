import { useState } from "react";
import { Link } from "react-router-dom";

export default function Create_workouts(){
   

    const [workouts, setWorkouts] = useState(()=>{
        const savedTemplates = localStorage.getItem("templates");
        return savedTemplates ? JSON.parse(savedTemplates) : [];
    }); // workouts holds each new workout and setWorkouts is a update function to update workouts but if
        // There are workouts saved  in local storage then it will display those workouts
    
    

    const newWorkout = () => {
        
        const workoutName = prompt("Enter Workout Name");
        if (!workoutName) return;
        const workoutExercise = prompt("Enter Workout Exercises (seperated by commas)");
        if (!workoutExercise) return;

        const workout ={
            name: workoutName,
            exercises: workoutExercise.split(",").map(e => e.trim())
        };

        const updatedWorkouts = ([...workouts, workout]);

        setWorkouts(updatedWorkouts);
        localStorage.setItem(
            "templates",
            JSON.stringify(updatedWorkouts)
        );
        
     
    }
    const deleteWorkout = (index) => {
            const updatedWorkouts =workouts.filter((_, i) => i !== index);
            setWorkouts(updatedWorkouts);
            localStorage.setItem("templates", JSON.stringify(updatedWorkouts));
        }
  
    return(
        <>


            <div className="pageC"> 

                <div className="button-container">
                    <button className = "my-button" onClick={newWorkout}>Create Workout</button>

                </div>
                {workouts. length > 0 && ( 
                <table className="workout-table">
                    <tbody>
                        <tr>
                            <th>Workouts</th>
                            <th>Exercises</th>
                            <th>Delete</th>
                        </tr>
                        {workouts.map((workout,i) => (
                            <tr key = {i}>
                                <td>{workout.name}</td>
                                <td>{workout.exercises.join(" | ")}</td>
                                <td>
                                    <button onClick={() => deleteWorkout(i)}> ❌ </button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>
            <Link to="/home">
            <button className='back'>Back</button>
            </Link>
        </>
    );
}

