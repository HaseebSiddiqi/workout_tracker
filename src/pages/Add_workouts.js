import Header from '../components/Header'
import { useState } from 'react';
import { Link } from "react-router-dom";



export default function Add_workouts(){
    const savedTemplates = JSON.parse(localStorage.getItem("templates")) || [];

    const [newWorkout, setNewWorkout] = useState(null);

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const [feedback, setFeedback] =useState("");
    
    const handleClick = (selectWorkout) => {
            setFeedback("")
            setNewWorkout ({
                name: selectWorkout?.name,
                exercises: selectWorkout?.exercises.map(e =>({
                    name: e,
                    weight: 0,
                    reps: [0,0,0]
                }))
            });
        }
   
    const updateWeight =(index, value) =>{

        setNewWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map((ex, i) =>
            i === index ? { ...ex, weight: value } : ex
            )
        }));
    };

    const updateReps = (index, repIndex, value) =>{

        setNewWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map((ex, i) =>
            i === index ? { ...ex, reps: ex.reps.map((r,j) =>(j === repIndex ? value :r)) } 
            : ex
            )
        }));
    };
    
    

   
    const addWorkout =() =>{
        const saveCurrent ={
            date: date,
            name: newWorkout.name, 
            exercises: newWorkout.exercises
            
        };

        const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        const updatedWorkouts = [...workouts, saveCurrent];
        localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
        setNewWorkout(null);

        setFeedback("Workout Added!")
    }
    return(
        <>
            
           <div className='pageH'> 
           
            <div className='display-workouts'> 
                 <h2>Select a workout</h2>
                 
                 {savedTemplates.map((selectWorkout, i) => (
                <div className='display-workout' key ={i} onClick={() => handleClick(selectWorkout)}>
                    {selectWorkout.name}</div>
            ))}

            </div>
            
         
            {newWorkout && (
            <table className="addWorkoutTable" >
                
                <tbody>
                    <tr>
                        <th className ="spanrow" colSpan={6}><input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/></th>
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
                            <td>    {exercise.name}      </td>
                            <td>    <input type= "text" value = {exercise.weight} onChange={e => updateWeight(i, Number(e.target.value))}/></td>
                            <td>    <input type= "text" value = {exercise.reps[0]} onChange={e => updateReps(i, 0, Number(e.target.value))}/></td>
                            <td>    <input type= "text" value = {exercise.reps[1]} onChange={e => updateReps(i, 1, Number(e.target.value))}/></td>
                            <td>    <input type= "text" value = {exercise.reps[2]} onChange={e => updateReps(i, 2, Number(e.target.value))}/></td>
                        </tr>
                        
                    ))}
                    <tr> 
                        <th className='spanrow2' colSpan={6}><button onClick={addWorkout}> Add Workout </button></th> 
                    </tr>
                    
                </tbody>
            </table>
            )}

            {feedback &&<p>{feedback}</p>}
      
            </div>
            <Link to="/home">
            <button className='back' >Back</button>
            </Link>
        </>
    )
}

