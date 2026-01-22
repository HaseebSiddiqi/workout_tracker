import Header from '../components/Header'
import { useState } from 'react';
const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];


export default function Add_workouts(){
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const handleClick = (workout) =>{
        setSelectedWorkout(workout);
        console.log("Workout clicked:", workout);
        console.log("Type of exercises:", typeof workout.exercises);
       
    }
    
    const newWorkout ={
        name: selectedWorkout?.name,
        exercises: selectedWorkout?.exercises.map(e =>({
            name: e,
            weight: 0,
            reps: [0,0,0]
        }))

    };
    return(
        <>
            
           <div className='pageH'> 
           
            <div className='display-workouts'> 
                 <h2>Select a workout</h2>
                 
                 {savedWorkouts.map((workout, i) => (
                <div className='display-workout' key ={i} onClick={() => handleClick(workout)}>
                    {workout.name}</div>
            ))}

            </div>
            
         
            {selectedWorkout && (
            <table className="addWorkoutTable" >
                
                <tbody>
                    <tr>
                        <th className ="spanrow" colSpan={5}>Date: {new Date().toLocaleDateString()}</th>
                    </tr>
                    <tr>
                        <th> {newWorkout.name || "Exercise Name"}</th>
                        <th>Weights</th>
                        <th>Set 1</th>
                        <th>Set 2</th>
                        <th>Set 3</th>
                    </tr>

                    {newWorkout?.exercises?.map((exercise, i) => (

                        
                        <tr key= {i}>
                            <td>    {exercise.name}     </td>
                            <td>    {exercise.weight}   </td>
                            <td>    {exercise.reps[0]}  </td>
                            <td>    {exercise.reps[1]}  </td>
                            <td>    {exercise.reps[2]}  </td>
                    
                    
                        </tr>
                        
                    ))}
                    <tr> 
                        <th className ="spanrow" colSpan={5}>Add Workout</th> 
                    </tr>
                    
                </tbody>
            </table>
            )}
            </div>
        </>
    )
}