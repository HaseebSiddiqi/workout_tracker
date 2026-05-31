import { useState, useEffect } from "react";
import { apiFetch } from "./apiClient.js";

export default function Create_workouts() {


    const [workouts, setWorkouts] = useState([]);

    const [workoutNameInput, setWorkoutNameInput] = useState("");

    const [exercises, setExercises] = useState(["", "", ""]);

    const [feedback, setFeedback] = useState("");


    useEffect(() => {

        const fetchWorkouts = async () => {
            try {

                const res = await apiFetch(`https://workouttracker-production-4d3e.up.railway.app/workouts`);
                const data = await res.json();

                setWorkouts(data.Items || []);
            }
            catch (err) {
                console.error(err);
            }
        }

        fetchWorkouts();

    }, [])

    const newWorkout = async () => {


        if (!workoutNameInput.trim()) {
            alert("Please enter a Workout Name");
            return;
        }

        const validExercises = exercises.map(e => e.trim()).filter(e => e !== "");
        if (validExercises.length !== exercises.length) {
            alert("Please fill all exercises");
            return;
        }

        const workout = {

            workoutName: workoutNameInput.trim(),
            exercises: validExercises
        };

        setWorkouts([...workouts, workout]);

        await apiFetch("https://workouttracker-production-4d3e.up.railway.app/workouts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workout)
        });

        setWorkoutNameInput("");
        setExercises(["", "", ""]);

        setFeedback("New Workout Type Created!")
        setTimeout(() => {
            setFeedback("");
        }, 2000)

    }

    const deleteWorkout = async (index) => {

        const workoutToDelete = workouts[index];

        const workoutName = workoutToDelete.workoutName;

        try {
            const res = await apiFetch(
                `https://workouttracker-production-4d3e.up.railway.app/workouts/${encodeURIComponent(workoutName)}`,
                {
                    method: "DELETE"
                }
            );

            if (!res.ok) {
                const err = await res.json();
                console.error("Delete failed:", err);
                return;
            }


            const updatedWorkouts = workouts.filter((_, i) => i !== index);
            setWorkouts(updatedWorkouts);

            setFeedback("Workout Type Deleted!")
            setTimeout(() => {
                setFeedback("");
            }, 2000)

        } catch (err) {
            console.error("Error deleting workout:", err);
        }

    };

    return (
        <>
            <div className="pageC">

                <div className="table-container">
                    <table className="workout-table create-workout-table">
                        <tbody>
                            <tr>
                                <td className='spanrow2' colSpan={2}>
                                    <h2>Create a Workout</h2>
                                </td>
                            </tr>
                            <tr>
                                <th className="NewWorkoutType">Workout Name</th>
                                <th className="NewWorkoutType">Exercises</th>
                            </tr>
                            <tr>
                                <td className="inputCell create-name-cell" rowSpan={exercises.length}>
                                    <input
                                        value={workoutNameInput}
                                        onChange={e => setWorkoutNameInput(e.target.value)}
                                        className="inputText"
                                        placeholder="Workout name…"
                                    />
                                </td>
                                <td className="inputCell">
                                    <input
                                        value={exercises[0]}
                                        onChange={e => {
                                            const newExercises = [...exercises];
                                            newExercises[0] = e.target.value;
                                            setExercises(newExercises);
                                        }}
                                        className="inputText"
                                        placeholder="Exercise 1…"
                                    />
                                </td>
                            </tr>
                            {exercises.slice(1).map((exercise, i) => (
                                <tr key={i + 1}>
                                    <td className="inputCell">
                                        <input
                                            value={exercise}
                                            onChange={e => {
                                                const newExercises = [...exercises];
                                                newExercises[i + 1] = e.target.value;
                                                setExercises(newExercises);
                                            }}
                                            className="inputText"
                                            placeholder={`Exercise ${i + 2}…`}
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className="controlsCell">
                                    <div className="SetControls">
                                        <button className="addButton"
                                            onClick={() => setExercises(prev => prev.length < 10 ? [...prev, ""] : prev)}>
                                            Add Exercise
                                        </button>
                                        <button className="minusButton"
                                            onClick={() => setExercises(prev => prev.length > 1 ? prev.slice(0, -1) : prev)}>
                                            Delete Exercise
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='submitbtn' colSpan={2}>
                                    <button onClick={newWorkout}>Submit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {feedback && <h2>{feedback}</h2>}

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
                                        <td>{workout.workoutName}</td>
                                        <td className="exercises-td">{workout.exercises.join(" | ")}</td>
                                        <td>
                                            <button onClick={() => deleteWorkout(i)}> ❌ </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

