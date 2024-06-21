import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        // Cleanup the timer if the component unmounts before the timer finishes
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg">Redirecting to the homepage in 3 seconds...</p>
        </div>
    );
};

export default NotFound;
