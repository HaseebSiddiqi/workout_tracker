import { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";

export default function View_workouts(){


    const [viewWorkouts, updateWorkouts] = useState(() =>{
        const savedWorkouts = localStorage.getItem("workouts")
        return savedWorkouts ? JSON.parse(savedWorkouts) : [];
    });
    const clearWorkouts = () => {
    localStorage.removeItem("workouts"); // removes from localStorage
    updateWorkouts([]); // clears state so UI updates
    };

    return(
        <>
        <h1> View Workouts</h1>
        <ul>
        {viewWorkouts.map((workout, index) => (
            <li key={index}> {workout.date} {workout.name}    {workout.exercises.map((exercise, exerciseIndex) => (
              <li key={exerciseIndex}>
                {exercise.name}: {exercise.weight} lb x {exercise.reps.join(', ')} reps
              </li>
            ))}  </li>
        ))}
        </ul>

         <button onClick={clearWorkouts}>clear</button>
        <Calendar
            showFixedNumberOfWeeks={true}
            
            tileClassName={({date, view})=>{ 
                if (view ==="month"){
                    const dateString = date.toISOString().split("T")[0];
                  
                   if(viewWorkouts.some(w=> w.date === dateString)){
                     return "workout-day";
                    }
                
                    return null;
                }
            }}
            
        />
            <Link to="/home">
            <button className='back'>Back</button>
            </Link>
  
        </>
       
    )

   

}