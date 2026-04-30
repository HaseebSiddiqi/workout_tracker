import React, { useState } from 'react';
import { confirmSignUp } from 'aws-amplify/auth';
import { useNavigate } from "react-router-dom";

export default function VerifyAccount({ username }) {

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleVerify = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await confirmSignUp({
                username,
                confirmationCode: code
            });
            alert("Account verified successfully")
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Verify Account</h2>
            <form onSubmit={handleVerify}>
                <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required />
                {error && <p className="form-error">{error}</p>}
                <button type="submit">Verify</button>
                <button type="button" onClick={() => navigate("/login")}>Back to Login</button>
            </form>



        </div>
    );
}