// src/RegisterForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import axios from "axios";


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        confirmPassword: "",
        passwordLength: "",
        capitalLetter: "",
        numberPassword: "",
        symbolPassword: "",
        emailError: "",
        firstNameError: "",
        lastNameError: ""
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if(name === "password") {
            validatePasswordLength(value);
            validateAtLeastOneCapitalLetter(value);
            validateAtLeastOneNumber(value);
            validateAtLeastOneSymbol(value);
        }

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

    const validateAtLeastOneSymbol = (password) => {
        let hasAtLeastOneSymbol = false;
        for(let character of password){
            if(character >= '!' && character <= '/')
            {
                hasAtLeastOneSymbol = true;
                break;
            }
        }
        if(hasAtLeastOneSymbol){setErrors((prevErrors) => ({...prevErrors, symbolPassword: ""}));}
        else
        {
            setErrors((prevErrors)=>({...prevErrors, symbolPassword: "Password must have at least one symbol ! # $ % & ( ) * + - . / , ' ",}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.confirmPassword || errors.capitalLetter || errors.passwordLength || errors.numberPassword || errors.symbolPassword || errors.firstNameError|| errors.lastNameError) {
            return;
        }

        setLoading(true);

        try {
            const dataToSend = {email: formData.email, password: formData.password, firstName: formData.firstName, lastName: formData.lastName};
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', dataToSend);
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            if (error.response.status === 400) {
                console.error('Validation error:', error.response.data);
                setErrors((prevErrors) => ({...prevErrors, passwordLength: error.response.data.error || 'Invalid Password',}));
            } else if (error.response.status === 409) {
                console.error('User already exists.', error.response.data);
                setErrors((prevErrors) => ({...prevErrors, emailError: error.response.data.error || 'Email already in use.',}));
            }
        } finally {
            setLoading(false);
        }

        console.log(formData);
    };

    return (
        <div className="flex mt-9 items-center justify-center min-h-screen bg-bgColour">
            {loading ? (
                <div className="flex items-center justify-center">
                    <Spinner></Spinner>
                </div>
            ) : (
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-qbold text-center text-black">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fistName" className="block text-sm font-qregular text-black">
                            First Name
                        </label>
                        <input
                            type="firstName"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
                        />
                        {errors.firstNameError && (
                            <p className="mt-1 text-sm text-red-500">{errors.firstNameError}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-qregular text-black">
                            Last Name
                        </label>
                        <input
                            type="lastName"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
                        />
                        {errors.lastNameError && (
                            <p className="mt-1 text-sm text-red-500">{errors.lastNameError}</p>
                        )}
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
                        {errors.emailError && (
                            <p className="mt-1 text-sm text-red-500">{errors.emailError}</p>
                        )}
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
                            <p className="text-sm text-red-500">{errors.passwordLength}</p>
                        )}
                        {
                            errors.capitalLetter && (
                                <p className="text-sm text-red-500">{errors.capitalLetter}</p>
                            )
                        }
                        {
                            errors.numberPassword && (
                                <p className="text-sm text-red-500">{errors.numberPassword}</p>
                            )
                        }
                        {
                            errors.symbolPassword && (
                                <p className="text-sm text-red-500">{errors.symbolPassword}</p>
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
