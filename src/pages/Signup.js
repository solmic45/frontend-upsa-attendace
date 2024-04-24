import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri'; // Import icons
import '../styles/AuthForms.css';
import Header from '../components/Header';
import { axiosHandler, errorHandler } from "../utils/Helper";
import { ACCESS_TOKEN_COOKIE, LOGIN_URL, SIGNUP_URL } from "../utils/Constants";
import {   toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import { saveTokenToLocalStorage } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [showPassword, setShowPassword] = useState(false);
//  
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    });


   
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
      
 
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        setShowPassword(false)
     
            // Send signup request
            const response = await axiosHandler({
                method: "POST",
                url: SIGNUP_URL,
                data: values,
            }).catch((e) => {
                const err = errorHandler(e, true);
                console.log("msg:", err)
                toast.error(err.message , {
                    position: 'top-center',
                });
            }); 
        
        if(response){
            toast.success("Signup successful!", { position: 'top-center' });
            await handleRequest(values, setSubmitting)
        }
        setSubmitting(false);

    };


    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

   
    return (
        <div>
            <Header />
             <div className="auth-container">
                <h2>SIGN UP</h2>
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
                                        type={showPassword? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="field-input"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="error" />
                                </div>
                            </div>
                           
                            <div className="form-field ">
                            <div className="field-wrapper">
                                <label htmlFor="confirmPassword">Confirm Password:</label>  
                                <div className="password-input-container">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="field-input"
                                    />
                                    
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="error" />
                                </div>
                            </div>
                      
                            <button className="submit-btn" type="submit" disabled={formik.isSubmitting}>
                                Sign Up 
                            </button>
                            <div className="auth-link">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;
