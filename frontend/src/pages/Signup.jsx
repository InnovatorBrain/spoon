import React, { useState } from "react";
import apiClient from './ApiClient'; // Importing the custom Axios instance

export default function Signup() {
    const [userType, setUserType] = useState("student"); // Default to 'student'
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        is_student: true,
        is_teacher: false 
    });

    const handleUserTypeChange = (role) => {
        setUserType(role);
        setFormData({
            ...formData,
            is_student: role === 'student',
            is_teacher: role === 'teacher'
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formPayload = new FormData();
        Object.keys(formData).forEach((key) => {
            formPayload.append(key, formData[key]);
        });
        // Add userType to the form payload
        formPayload.append('user_type', userType);
        
        try {
            // Using the custom Axios instance 'apiClient' for making the request
            const response = await apiClient.post('/asd/register/', formPayload);
            localStorage.setItem('authToken', response.data.token); // Store the token for future requests
            alert('User created successfully!');
        } catch (error) {
            console.error(
                'Error during signup',
                error.response ? error.response.data : error.message
            );
            alert('Signup failed! Please try again.');
        }
    };

    return (
        <div className="border-r-8 bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
            {/* Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://www.svgrepo.com/show/301692/login.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Create a new Account
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                    Or
                    <a
                        href="/login"
                        className="ml-2 font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        Already have an Account
                    </a>
                </p>
            </div>

            {/* User Type Selection */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                {/* Student Button */}
                <button
                    onClick={() => handleUserTypeChange("student")}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-300 ${userType === "student"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l6.16-3.422a12.082 12.082 0 01.84 4.033C19 20.194 15.42 22 12 22s-7-1.806-7-7.389c0-1.562.317-3.06.84-4.033L12 14z"
                        />
                    </svg>
                    Register as a Student
                </button>

                {/* Tutor Button */}
                <button
                    onClick={() => handleUserTypeChange("teacher")}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-300 ${userType === "teacher"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L4.5 5.5 12 9l7.5-3.5L12 2zm0 7l-6.5-3L1 9v2h22V9l-4.5-2L12 9zm-3.5 3h7l-1 6h-5l-1-6zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Become a Tutor
                </button>
            </div>

            {/* Form */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Common Fields */}
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                First Name
                            </label>
                            <input
                                id="first_name"
                                name="first_name"
                                placeholder="Faizan"
                                type="text"
                                required
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="last_name"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                name="last_name"
                                placeholder="Ahmad"
                                type="text"
                                required
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                placeholder="faizy111@gmail.com"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirm_password"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                required
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 sm:text-sm"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


