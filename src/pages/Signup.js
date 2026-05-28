import React, { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { Link } from "react-router-dom";
import VerifyAccount from "../components/VerifyAccount";
export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [verifyAccount, setVerifyAccount] = useState(false);


    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email
                    }
                }
            });

            // After signup, go to login page
            setVerifyAccount(true);
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            {verifyAccount ? (
                <VerifyAccount username={username} />
            ) : (
                <>
                    <h2>Sign Up</h2>

                    <form onSubmit={handleSignup}>

                        <input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <p className="form-error">{error}</p>}


                        <button type="submit">Create Account</button>

                        <Link to="/login">Already have an account? Log in</Link>

                    </form>
                </>
            )}
        </div>
    );
}

