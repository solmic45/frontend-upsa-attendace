import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri'; // Import icons
import '../styles/AuthForms.css';
import Header from '../components/Header';
import { axiosHandler, errorHandler } from "../utils/Helper";
import { LOGIN_URL } from "../utils/Constants";
import { saveTokenToLocalStorage } from "../utils/LocalStorage";
import { ACCESS_TOKEN_COOKIE } from "../utils/Constants";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Login values:', values);
        setSubmitting(true);
        handleRequest(values, setSubmitting);
    };

    const handleRequest = async (values, setSubmitting) => {
        const result = await axiosHandler({
            method: "POST",
            url: LOGIN_URL,
            data: values,
        }).catch((e) => {
            const err = errorHandler(e, true);
            console.log("msg",err)
            toast.error(err.message, {
                position: 'top-center',
            });
        });
        if (result) {
            console.log("result::", result)
            const token = result.data.token;
            saveTokenToLocalStorage(ACCESS_TOKEN_COOKIE, token);
            navigate("/");
          }
      
        setSubmitting(false);
    };


    const togglePasswordVisibility = () => {
        setShowLoginPassword(prevState => !prevState);
    };

    return (
        <div>
            <Header />
             <div className="auth-container">
                <h2>LOGIN</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {formik => (
                        <Form>
                            <div className="form-field">
                                <div className="field-wrapper">
                                <label htmlFor="email">Email:</label> 
                                <Field type="email" id="email" name="email" className="field-input" />
                                <ErrorMessage name="email" component="div" className="error" />
                                </div>
                            </div>
                            <div className="form-field ">
                            <div className="field-wrapper">
                                <label htmlFor="password">Password:</label>  
                                <div className="password-input-container">
                                    <Field
                                        type={showLoginPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="field-input" 
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showLoginPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="error" />
                                </div>
                            </div>
                            <button className="submit-btn" type="submit" disabled={formik.isSubmitting}>
                             Login 
                            </button>
                            <div className="auth-link">
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
