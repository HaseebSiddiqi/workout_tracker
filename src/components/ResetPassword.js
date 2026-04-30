import React, { useState } from 'react';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

export default function ResetPassword({ onBack }) {
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleSendCode = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await resetPassword({ username: email });
            setCodeSent(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await confirmResetPassword({
                username: email,
                confirmationCode: code,
                newPassword: newPassword
            });

            onBack(); // return to login after success
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>

            {!codeSent ? (
                <form onSubmit={handleSendCode}>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Send Reset Code
                    </button>
                    <button type="button" onClick={onBack}>
                        Back to Login
                    </button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <input
                        type="text"
                        placeholder="Enter code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    {error && <p className='form-error'>{error}</p>}

                    <button type="submit">
                        Reset Password
                    </button>
                    <button type="button" onClick={onBack}>
                        Back to Login
                    </button>
                </form>
            )}


        </div>
    );
}