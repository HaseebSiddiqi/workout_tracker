import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CreateWorkouts from "../components/CreateWorkouts";
import AddWorkouts from "../components/AddWorkouts";
import ViewWorkouts from "../components/ViewWorkouts";
import WorkoutTypes from "../components/WorkoutTypes";


export default function Home() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');

    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const [activeComponent, setActiveComponent] = useState("home");

    const [refreshKey, setRefreshKey] = useState(0);



    const refreshWorkouts = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (err) {
            console.error('Error signing out', err);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setUsername(user.username);
            } catch {

            }
        };
        fetchUser();

    }, []);



    return (
        <> 
        <Navbar 
            username = {username}
            setActiveComponent={setActiveComponent}
            handleSignOut ={handleSignOut}>
        </Navbar>
     
        <div className="pageH"> 
            <div className="viewWorkouts"> 
                <ViewWorkouts refreshKey={refreshKey}/>
            </div>

        
                <div className ="workoutTypes" style={{ display: "block" }}>
                    <WorkoutTypes
                        onSelectWorkout={setSelectedWorkout}
                        setActiveComponent={setActiveComponent}
                        refreshKey={refreshKey}
                    />
                </div>
                <div className="workoutForms"> 
                <div className="addWorkout" style={{ display: activeComponent === "add" ? "block" : "none" }}>
                    <AddWorkouts
                        selectedWorkout={selectedWorkout}
                        onSuccess={refreshWorkouts}
                    />
                </div>

                <div className="createWorkout"style={{ display: activeComponent === "create" ? "block" : "none" }}>
                    <CreateWorkouts onSuccess={refreshWorkouts}/>
                </div>
                </div>
            </div>
        
        </>
    );
}