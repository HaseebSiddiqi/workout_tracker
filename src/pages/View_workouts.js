import { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import React from "react";
export default function View_workouts(){


    const [viewWorkouts, updateWorkouts] = useState(() =>{
        const savedWorkouts = localStorage.getItem("workouts")
        return savedWorkouts ? JSON.parse(savedWorkouts) : [];
    });

    const [viewCalender, updateCalender] = useState(true);

    const [currentDate, setDate] = useState(null);
  
    const handleDelete = () => {
        const dateString = currentDate.toISOString().split("T")[0];

        const updated = viewWorkouts.filter(
            w => w.date !== dateString
        );

        updateWorkouts(updated);

        localStorage.setItem("workouts", JSON.stringify(updated));

        updateCalender(true);
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
                
            />  </div>
                 ): (
                
                    <div className="table-container"> 
                    <table className="addWorkoutTable" >
                        <tbody>
                            <tr>
                                <th className="spanrow" colSpan={5} >{currentDate?.toISOString().split("T")[0]}</th>
                            </tr>
                            {viewWorkouts
                                .filter(w => w.date === currentDate?.toISOString().split("T")[0])
                                .map(w => (
                                <React.Fragment key={w.date}>
                                <tr>
                                    <th>{w.name}</th>
                                    <th>Weights</th>
                                    <th>Set 1</th>
                                    <th>Set 2</th>
                                    <th>Set 3</th>
                                </tr>
                                    {w.exercises.map((exercise, exerciseIndex) => (
                                   
                                    <tr key={exerciseIndex}>
                                        <td> {exercise.name} </td>
                                        <td>{exercise.weight} </td>
                                        <td>{exercise.reps[0]}</td>
                                        <td>{exercise.reps[1]}</td> 
                                        <td>{exercise.reps[2]}</td>
                                        
                                    </tr>
                                    ))}
                                </React.Fragment>
                                ))}
                                <tr>
                                    <th className="spanrow2" colSpan={5}>  <button onClick={handleDelete} > Delete</button></th>
                                </tr>
                            
                        </tbody>
                    </table>
                    </div>
                
               
                
            )
        }  
            <Link to="/home">
            <button className='back'>Back</button>
            </Link>
  
        </>
       
    )

   

}