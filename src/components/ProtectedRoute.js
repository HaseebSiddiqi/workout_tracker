import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await getCurrentUser();
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkUser();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/" />;

    return children;
}