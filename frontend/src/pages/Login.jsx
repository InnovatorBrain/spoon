import React, { useState } from "react";
import apiClient from './ApiClient'; // Importing the custom Axios instance

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post('/asd/login/', formData);
            console.log(response); 
        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.token.access);
            localStorage.setItem('refreshToken', response.data.token.refresh);
            window.location.href = '/teacher-pro';
        } else {
            setError('Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Login failed:', error); 
        setError('Login failed. Please try again.');
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
                    Sign in to your Account
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                    Or
                    <a
                        href="/signup"
                        className="ml-2 font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        Create a new Account
                    </a>
                </p>
            </div>

            {/* Form */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                id="username"
                                name="username"
                                placeholder="faizy111@gmail.com"
                                type="email"
                                required
                                value={formData.username}
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
                            <a
                                href="/forgot-password"
                                className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
