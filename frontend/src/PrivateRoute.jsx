import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoutes = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const response = await axios.get('http://127.0.0.1:8000/asd/validate/token/');
                    setAuthenticated(true);
                    console.log('Token validated');
                    fetchUserProfile(); // Fetch user profile after validating token
                } catch (error) {
                    console.error('Token validation failed', error);
                    setAuthenticated(false);
                    navigate('/login');
                }
            } else {
                setAuthenticated(false);
                navigate('/login');
            }
            setLoading(false);
        };

        checkAuthentication();
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/asd/profile/');
            console.log('Profile Data:', response.data);
            redirectToProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile', error);
            // Handle error fetching profile data, maybe redirect to a default route
        }
    };

    const redirectToProfile = (userData) => {
        if (userData.student_profile > 0) { // Check if the user has a student profile
            navigate('/student-pro');
        } else if (userData.teacher_profile > 0) { // Check if the user has a teacher profile
            navigate('/teacher-pro');
        } else {
            // If user has no specific profile type, you may want to handle this case
            console.error('User has no specific profile type');
            navigate('/default-route');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return authenticated ? <Outlet /> : null;
};

export default PrivateRoutes;
