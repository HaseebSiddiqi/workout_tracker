import { Link, useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from "react";
export default function Home() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (err) {
            console.error('Error signing out', err);
        }
    };
    const [username, setUsername] = useState('');
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
        <div className="pageH">

            <h1>Home Page welcome {username}</h1>

            <div className="button-container">

                <Link to="/Create_workouts">
                    <button className='my-button'>Create Workout</button>
                </Link>

                <Link to="/Add_workouts">
                    <button className='my-button'>Add Workout</button>
                </Link>

                <Link to="/View_workouts">
                    <button className='my-button'>View Workouts</button>
                </Link>

                <button className="my-button" onClick={handleSignOut}>
                    Sign Out
                </button>

            </div>
        </div>
    );
}