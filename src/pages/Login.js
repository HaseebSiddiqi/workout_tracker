import { useState, useEffect } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ResetPassword from '../components/ResetPassword';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
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
    }, [navigate]);
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
        <div className="card login-card">
            {resetPassword ? (
                <ResetPassword onBack={() => setResetPassword(false)} />
            ) : (
                <>
                    <h2>Log In</h2>
                    <form onSubmit={handleLogin}>

                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="modern-input"
                                value={username}
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="modern-input"
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="form-error">{error}</p>}

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Sign In</button>

                        <div style={{ marginTop: '15px' }}>
                            <button type="button" className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: '#64748b', boxShadow: 'none' }} onClick={() => setResetPassword(true)}>Forgot Password?</button>
                        </div>

                        <p className="text-center">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
                </>
            )}
        </div>
    )
}


