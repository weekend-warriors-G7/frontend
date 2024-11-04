// src/RegisterForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import axios from "axios";


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        confirmPassword: "",
        passwordLength: "",
        capitalLetter: "",
        numberPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({
            ...formData,
            [name]: value,
        });

        if(name === "password") {
            validatePasswordLength(value);
            validateAtLeastOneCapitalLetter(value);
            validateAtLeastOneNumber(value);
        }

        // Check for password match if updating confirmPassword field
        if (name === "confirmPassword" || name === "password") {
            validateConfirmPassword(name === "confirmPassword" ? value : formData.confirmPassword);
        }
    };

    const validatePasswordLength = (password) => {
        if (password.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordLength: "Password must be at least 8 characters",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordLength: "",
            }));
        }
    };

    const validateConfirmPassword = (confirmPasswordValue) => {
        if (confirmPasswordValue !== formData.password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: "Passwords do not match",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: "",
            }));
        }
    };

    const validateAtLeastOneCapitalLetter = (password) => {

        let hasCapitalLetter = false;
        for(let character of password){
            if(character >= 'A' && character <= 'Z')
            {
                hasCapitalLetter = true;
                break;
            }
        }

        if(hasCapitalLetter){
            setErrors((prevErrors) =>
                ({...prevErrors, capitalLetter: ""}));
        }
        else {
            setErrors((prevErrors) => ({...prevErrors, capitalLetter: "Password must have at least one capital letter",}));
        }
    };

    const validateAtLeastOneNumber = (password)=>{
        let hasNumber = false;
        for(let character of password){
            if(character >= '0' && character <= '9')
            {
                hasNumber = true;
                break;
            }
        }
        if(hasNumber){setErrors((prevErrors) => ({...prevErrors, numberPassword: ""}));}
        else
        {
            setErrors((prevErrors)=>({...prevErrors, numberPassword: "Password must have at least one number",}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.confirmPassword || errors.capitalLetter || errors.passwordLength || errors.numberPassword) {
            alert("Please fix the password.");
            return;
        }

        if (errors.capitalLetter) {
            alert(errors.capitalLetter);
            return;
        }

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
           /*

            console.log(formData);
            navigate("/login");*/

            console.log(formData);

            const dataToSend = {email: formData.email, password: formData.password};

            const response = await axios.post('https://your_api_endpoint.com/register', dataToSend);

            if (response.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            alert("Registration failed:", error.response ? error.response.data : error.message);
            console.error("Registration failed:", (error.response ? error.response.data : error.message));
        } finally {
            setLoading(false);
        }

        console.log(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-bgColour">
            {loading ? (
                <div className="flex items-center justify-center">
                    <Spinner></Spinner>
                </div>
            ) : (
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-qbold text-center text-black">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-qregular text-black">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-qregular text-black">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-qregular text-black">
                            Password
                        </label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
                        />
                        {errors.passwordLength && (
                            <p className="mt-1 text-sm text-red-500">{errors.passwordLength}</p>
                        )}
                        {
                            errors.capitalLetter && (
                                <p className="mt-1 text-sm text-red-500">{errors.capitalLetter}</p>
                            )
                        }
                        {
                            errors.numberPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.numberPassword}</p>
                            )
                        }
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-qregular text-black">
                            Confirm Password
                        </label>
                        <input
                            type="text"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-qregular text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none focus:ring-linkColour"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="font-qregular text-sm text-center text-black">
                    Already have an account?{" "}
                    <Link to="/login" className="font-qbold text-indigo-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
            )}
        </div>
    );
};

export default RegisterForm;
