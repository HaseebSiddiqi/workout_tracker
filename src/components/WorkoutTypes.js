import { useState, useEffect } from "react";
import { apiFetch } from "./apiClient.js";

export default function WorkoutTypes({onSelectWorkout, setActiveComponent, refreshKey}) {
    const [workouts, setWorkouts] = useState([]);

    const [feedback, setFeedback] = useState("");


    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const res = await apiFetch(
                    "https://workouttracker-production-4d3e.up.railway.app/workouts"
                );

                const data = await res.json();
                setWorkouts(data.Items || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWorkouts();
    }, [refreshKey]);

    const deleteWorkout = async (index) => {
        const workoutToDelete = workouts[index];
        const workoutName = workoutToDelete.workoutName;

        try {
            const res = await apiFetch(
                `https://workouttracker-production-4d3e.up.railway.app/workouts/${encodeURIComponent(workoutName)}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                const err = await res.json();
                console.error("Delete failed:", err);
                return;
            }

            setWorkouts((prev) => prev.filter((_, i) => i !== index));

            setFeedback("Workout Type Deleted!");

            setTimeout(() => {
                setFeedback("");
            }, 2000);
        } catch (err) {
            console.error("Error deleting workout:", err);
        }
    };



    return (
        <>
            

            <div className="table-container">
                {workouts.length > 0 && (
                    <table className="workout-table created-workouts-table">
                        <tbody>
                            <tr>
                                <td className="spanrow2" colSpan={12}>
                                    <h2>Your Created Workouts</h2>
                                </td>
                            </tr>

                            <tr>
                                <th>Workouts</th>
                                <th>Exercises</th>
                                <th>Delete</th>
                            </tr>

                            {workouts.map((workout, i) => (
                                <tr key={i}>
                                    <td className="workout-name-cell" onClick={() => {onSelectWorkout(workout); setActiveComponent("add");}}>
                                      
                                        {workout.workoutName}
                                        
                                    </td>
                                    <td className="exercises-td">
                                        {workout.exercises.join(" | ")}
                                    </td>
                                    <td>
                                        <button onClick={() => deleteWorkout(i)}>
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td  className='submitbtn' colSpan={3}>
                                    <button onClick={() => {onSelectWorkout(null); setActiveComponent("create");}}>
                                        Add Workout Type
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            {feedback && <h2>{feedback}</h2>}
        </>
    );
}