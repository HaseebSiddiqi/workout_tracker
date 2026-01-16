import { useState } from "react";
export default function Create_workouts(){
   

    const [workouts, setWorkouts] = useState(()=>{
        const savedWorkouts = localStorage.getItem("workouts");
        return savedWorkouts ? JSON.parse(savedWorkouts) : [];
    }); // workouts holds each new workout and setWorkouts is a update function to update workouts
    
    

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
            "workouts",
            JSON.stringify(updatedWorkouts)
        );
        
     
    }
    const deleteWorkout = (index) => {
            const updatedWorkouts =workouts.filter((_, i) => i !== index);
            setWorkouts(updatedWorkouts);
            localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
        }
  
    return(
        <>
            
            <h1>Create Workouts</h1>
            <button onClick={newWorkout}>Create Workout</button>
            <table className="workout-table">
                
                    
                
                <tbody>
                    <tr>
                        <th>Workout</th>
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
        </>
    );
}

