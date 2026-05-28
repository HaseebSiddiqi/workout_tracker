import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CreateWorkouts from "../components/CreateWorkouts";
import AddWorkouts from "../components/AddWorkouts";
import ViewWorkouts from "../components/ViewWorkouts";


export default function Home() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');


    const [activeComponent, setActiveComponent] = useState("home");;

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

    useEffect(() => {
        fetch("http://localhost:5000/")
            .then(res => res.text())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <> 
        <Navbar 
            username = {username}
            setActiveComponent={setActiveComponent}
            handleSignOut ={handleSignOut}>
        </Navbar>
     

        <div className="pageH">
            {activeComponent === "home" && <ViewWorkouts username = {username} />}
            {activeComponent === "create" && <CreateWorkouts username = {username} />}

            {activeComponent === "add" && <AddWorkouts username = {username} />}
        
            

           
        </div>
        </>
    );
}