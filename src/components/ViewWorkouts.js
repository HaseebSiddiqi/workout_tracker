import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import React from "react";
import { apiFetch } from "./apiClient.js";

export default function ViewWorkouts(){


    const [viewWorkouts, updateWorkouts] = useState([]);

    const [viewCalender, updateCalender] = useState(true);

    const [currentDate, setDate] = useState(null);
  
    const [feedback, setFeedback] =useState("");


    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const res = await apiFetch(`http://localhost:5000/workoutLogs`);
                const data = await res.json();

                updateWorkouts(data.Items || []);
                

            }
            catch (err){
                console.error(err);
            }
            }
        
            fetchWorkouts();
        
        
    }, [])

    const handleDelete = async (workoutId) =>{
        await apiFetch(`http://localhost:5000/workoutLogs/${workoutId}`, {
            method: "DELETE"
        });

        updateWorkouts(prev => 
            prev.filter(w=> w.workoutId !== workoutId)
        );
        updateCalender(true);
    
        
        setFeedback("Workout Deleted!")
        setTimeout(()=> {
            setFeedback("");
        }, 2000)
       
        
    };
 

    const isWorkout = (date) =>{
        const dateString = date.toISOString().split("T")[0];
        return viewWorkouts.some(w=> w.date === dateString);
    }
    return(
        <>
        
        {viewCalender ? (
            <div className="calendar-container"> 
            <Calendar
                showFixedNumberOfWeeks={true}   
                onClickDay={(date) =>{
                    if (isWorkout(date)){
                        setDate(date);
                        updateCalender(false);

                    }


                }}
                tileClassName={({date, view})=>{ 
                    if (view ==="month" && isWorkout(date)){
                        return "workout-day";
                    }
                        return null;
                    }
                }
                
            />               
            </div> 
            
                 ) : (
                
                    <div className="table-container"> 
                    <table className="addWorkoutTable" >
                        <tbody>

                            <tr>
                                <th className="spanrow" colSpan={5} >{currentDate?.toISOString().split("T")[0]}</th>
                            </tr>
                            {viewWorkouts
                                .filter(w => w.date === currentDate?.toISOString().split("T")[0])
                                .map((w, index, arr) => (
                                <React.Fragment key={w.workoutId}>
                                <tr>
                                    <th>{w.workoutName}</th>
                                    
                                    {w.exercises[0].sets.map((set, i)=>(
                                        <th key={i}>
                                            <div key ={i}>
                                                 Set {i +1}
                                            </div>
                                        </th>
                                       
                                    ))}
                                    <th> Notes</th>
                                    
                                 
                                </tr>
                                    {w.exercises?.map((exercise, exerciseIndex) => (
                                   
                                    <tr key={exerciseIndex}>
                                        <td className="exercise-name-cell"> 
                                            <div className="exercise-name-wrapper">
                                                {exerciseIndex === 0 && <div className="set-labels-spacer">&nbsp;</div>}
                                                <div className="exercise-name-content">{exercise.name}</div> 
                                            </div>
                                        </td>
                                        
                                        {exercise.sets.map((set, i) => (
                                            <td className='Sets' key={i}> 
                                                <div className="Sets-content">
                                                    {exerciseIndex === 0 && (
                                                        <div className="set-labels">
                                                            <span className="label-w">W</span>
                                                            <span className="label-r">R</span>
                                                        </div>
                                                    )}
                                                    <div className="set-inputs">
                                                        <div className='Weight'>{set.weight}</div>
                                                        <div className='Reps'>{set.reps}</div>
                                                    </div>
                                                </div>
                                            </td>
                                        ))}
                                        {exerciseIndex === 0 && (
                                             <td rowSpan={w.exercises.length}> {w.notes}</td>
                                        )}
                                       
                                      

                                    </tr>
                                    ))}
                             
                                <tr>
                                    <th className="spanrow2" colSpan={5}>  <button onClick={() => handleDelete(w.workoutId)} > Delete</button></th>
                                </tr>
                                {index < arr.length - 1 && (
                                    <tr className="workout-spacer-row">
                                        <td colSpan={12}></td>
                                    </tr>
                                )}
                                </React.Fragment>
                              
                              
                                ))}
                              
                            
                        </tbody>
                    </table>
                    </div>
                
               
                
            )
            
        }  
        {feedback &&<h2>{feedback}</h2>}

           
  
        </>
       
    )

   

}