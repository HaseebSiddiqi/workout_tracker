
import { useState, useEffect } from 'react';
import { apiFetch } from "./apiClient.js";




export default function Add_workouts() {

    const [workouts, setWorkouts] = useState([]);

    const [newWorkout, setNewWorkout] = useState(null);

    const [feedback, setFeedback] = useState("");

    useEffect(() => {

        const fetchWorkouts = async () => {
            try {
                const res = await apiFetch(`https://api.muscleup.live/workouts`);
                const data = await res.json();

                setWorkouts(data.Items || []);
            }
            catch (err) {
                console.error(err);
            }
        }

        fetchWorkouts();

    }, [])


    const handleClick = (selectWorkout) => {
        setNewWorkout({

            workoutId: Date.now().toString(),
            workoutName: selectWorkout?.workoutName,
            date: new Date().toLocaleDateString("en-CA"),
            notes: "",
            exercises: selectWorkout?.exercises.map(e => ({
                name: e,
                sets: [
                    {
                        weight: "",
                        reps: ""
                    },
                    {
                        weight: "",
                        reps: ""
                    },
                    {
                        weight: "",
                        reps: ""

                    }
                ] //sets made of weight then reps  can add more sets
            }))



        });
    }

    const addSets = () => {
        setNewWorkout(prevWorkout => {
            if (prevWorkout.exercises[0].sets.length >= 8) return prevWorkout;
            return {
                ...prevWorkout,

                exercises: prevWorkout.exercises.map(ex => ({
                    ...ex,
                    sets: [...ex.sets, { weight: "", reps: "" }]
                }))
            }
        })
    }

    const delSets = () => {
        setNewWorkout(prevWorkout => {
            if (prevWorkout.exercises[0].sets.length <= 1) return prevWorkout;
            return {
                ...prevWorkout,
                exercises: prevWorkout.exercises.map(ex => ({
                    ...ex,
                    sets: ex.sets.slice(0, -1)
                }))
            }

        })
    }

    const submitTable = async () => {
        await apiFetch("https://api.muscleup.live/workoutLogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newWorkout)
        });

        setNewWorkout(null);

        setFeedback("Workout Added!")
        setTimeout(() => {
            setFeedback("");
        }, 2000)

    }

    return (
        <>
            <div className='pageH'>
                <div className='display-workouts'>
                    <h2>Select a workout</h2>

                    {workouts.map((selectWorkout, index) => (
                        <div className='display-workout' key={index} onClick={() => handleClick(selectWorkout)}>
                            {selectWorkout.workoutName}

                        </div>
                    ))}
                </div>
                {feedback && <h2>{feedback}</h2>}
                {newWorkout && (
                    <div className="table-container">
                        <table className="addWorkoutTable">
                            <tbody>
                                <tr>
                                    <th className="spanrow2" colSpan={12}>
                                        <input
                                            type="date"
                                            value={newWorkout.date || ""}
                                            onChange={(e) => setNewWorkout(prev => ({ ...prev, date: e.target.value }))}
                                        />
                                    </th>
                                </tr>
                                <tr>

                                    <th>{newWorkout.workoutName}  </th>
                                    {newWorkout?.exercises[0]?.sets.map((set, setIndex) => (
                                        <th key={setIndex}>Set {setIndex + 1}</th>
                                    ))}

                                    <th>Notes</th>

                                </tr>
                                {newWorkout?.exercises?.map((exercise, i) => (
                                    <tr key={i}>

                                        <td className="exercise-name-cell">
                                            <div className="exercise-name-wrapper">
                                                {i === 0 && <div className="set-labels-spacer">&nbsp;</div>}
                                                <div className="exercise-name-content">{exercise.name}</div>
                                            </div>
                                        </td>
                                        {exercise.sets.map((set, j) => (


                                            <td className='Sets' key={j}>
                                                <div className="Sets-content">
                                                    {i === 0 && (
                                                        <div className="set-labels">
                                                            <span className="label-w">W</span>
                                                            <span className="label-r">R</span>
                                                        </div>
                                                    )}
                                                    <div className="set-inputs">
                                                        <div className='Weight'>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={set.weight}
                                                                onChange={(e) =>
                                                                    setNewWorkout(prev => ({
                                                                        ...prev,
                                                                        exercises: prev.exercises.map((ex, exIndex) =>
                                                                            exIndex === i
                                                                                ? {
                                                                                    ...ex,
                                                                                    sets: ex.sets.map((s, sIndex) =>
                                                                                        sIndex === j
                                                                                            ? {
                                                                                                ...s,
                                                                                                weight: e.target.value === ""
                                                                                                    ? ""
                                                                                                    : Math.max(0, Number(e.target.value))
                                                                                            }
                                                                                            : s
                                                                                    )
                                                                                }
                                                                                : ex
                                                                        )
                                                                    }))
                                                                }
                                                            />
                                                        </div>
                                                        <div className='Reps'>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={set.reps}
                                                                onChange={(e) =>
                                                                    setNewWorkout(prev => ({
                                                                        ...prev,
                                                                        exercises: prev.exercises.map((ex, exIndex) =>
                                                                            exIndex === i
                                                                                ? {
                                                                                    ...ex,
                                                                                    sets: ex.sets.map((s, sIndex) =>
                                                                                        sIndex === j
                                                                                            ? {
                                                                                                ...s,
                                                                                                reps: e.target.value === ""
                                                                                                    ? ""
                                                                                                    : Math.max(0, Number(e.target.value))
                                                                                            }
                                                                                            : s
                                                                                    )
                                                                                }
                                                                                : ex
                                                                        )
                                                                    }))
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        ))}
                                        {i === 0 && (
                                            <td className="notes" rowSpan={newWorkout.exercises.length}>
                                                <textarea className="textarea" placeholder="Workout notes..." value={newWorkout.notes} onChange={e => setNewWorkout({ ...newWorkout, notes: e.target.value })} />
                                            </td>
                                        )}

                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={newWorkout.exercises[0].sets.length + 2}>

                                        <div className='SetControls'>
                                            <button className="addButton" onClick={addSets}>Add Set</button>
                                            <button className="minusButton" onClick={delSets}>Delete Set</button>
                                        </div>
                                    </td>


                                </tr>
                                <tr>
                                    <td className='submitbtn' colSpan={12}>
                                        <button onClick={submitTable}>Submit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}















            </div>
        </>
    )


}

