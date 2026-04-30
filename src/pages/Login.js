import { useState, useEffect } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ResetPassword from '../components/ResetPassword';
import { getCurrentUser } from 'aws-amplify/auth';

export default function Login() {
    useEffect(() => {
        const checkUser = async () => {
            try {
                await getCurrentUser();
                navigate('/home'); // already logged in
            } catch {
                // not logged in → stay on login page
            }
        };

        checkUser();
    }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [resetPassword, setResetPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Call the Amplify signIn function with the user's credentials
            await signIn({ username, password });
            // Successfully logged in! Redirect the user to the dashboard
            navigate('/home');
        } catch (err) {
            console.error('Error signing in', err);
            // Display the error to the user (e.g., incorrect password)
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            {resetPassword ? (
                <ResetPassword onBack={() => setResetPassword(false)} />
            ) : (
                <>
                    <h2>Log In</h2>
                    <form onSubmit={handleLogin}>


                        <input
                            type="text"
                            value={username}
                            placeholder="Username or Email"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />



                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <p className="form-error">{error}</p>}

                        <Link to="/signup">Create account</Link>


                        <button type="submit">Sign In</button>

                        <button type="button" onClick={() => setResetPassword(true)}>Forgot Password</button>

                    </form>
                </>
            )}
        </div>

    )
}


