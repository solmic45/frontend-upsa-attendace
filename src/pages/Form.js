import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/FormStyles.css'; // Import the CSS file
import Header from '../components/Header';
import Options from '../components/Options';
import Footer from '../components/Footer';
import { axiosHandler, errorHandler } from "../utils/Helper";
import {  CREATE_FORM_URL } from "../utils/Constants";
import {  toast } from "react-toastify";
import { ACCESS_TOKEN_COOKIE } from '../utils/Constants';
import { loadTokenFromLocalStorage } from '../utils/LocalStorage';

const UserForm = () => {
    const initialValues = {
        indexNumber: '',
        name: '',
        gender: '',
        currentLevel: '',
        phoneNumber: '',
        groupings:'',
        lecturerName: '',
        instructorSeen: '',
        courseLevel: '',
        level400Course: ''
    };

    const validationSchema = Yup.object({
        indexNumber: Yup.string().required('Index number is required'),
        name: Yup.string().required('Name is required'),
        gender: Yup.string().required('Gender is required'),
        currentLevel: Yup.string().required('Current level is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        groupings: Yup.string().required('Grouping is required'),
        lecturerName: Yup.string().required('Lecturer name is required'),
        instructorSeen: Yup.string().required('Please indicate if you saw your instructor'),
        courseLevel: Yup.string().required('Course Level is required'),
        level400Course: Yup.string().required('Please select Level 400 course')
        // .when('courseLevel', {
        //     is: 'Bachelors Level 400',
        //     then: Yup.string().required('Please select Level 400 course')
        // })
    });

    
    const handleRequest = async (values, setSubmitting, resetForm ) => {
        const result = await axiosHandler({
            method: "POST",
            url:  CREATE_FORM_URL,
            data: values,
            token:   loadTokenFromLocalStorage(ACCESS_TOKEN_COOKIE),
        }).catch((e) => {
            const err = errorHandler(e, true);
            console.log("msg",err)
         
            toast.error(err.message );
        });
        if (result) {
            console.log("result::", result)
            toast.success(result.data.message );
            resetForm()
 
            
          }
      
        setSubmitting(false);
    };
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        // You can handle form submission here, e.g., make API call
        console.log('form values:', values);
        handleRequest(values, setSubmitting, resetForm  )
       
    };

    return (
      <div>
        <Header />
     
        <div className="form-container">
            <h2> ATTENDANCE RECORD FOR LECTURERS</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <Form>
                        <div className="form-field">
                            <label className="label" htmlFor="indexNumber">What is your index number?</label>
                            <Field className="input-field" type="text" id="indexNumber" name="indexNumber" />
                            <ErrorMessage name="indexNumber" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label className="label" htmlFor="name">What is your name?</label>
                            <Field className="input-field" type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label className="label" htmlFor="gender">What is your gender?</label>
                            <Field as="select" className="select-field" id="gender" name="gender">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label className="label" htmlFor="currentLevel">What is current level?</label>
                            <Field as="select" className="select-field" id="currentLevel" name="currentLevel">
                                <option value="">Select Current Level</option>
                                <option value="Level 100">Level 100</option>
                                <option value="Level 200">Level 200</option>
                                <option value="Level 300">Level 300</option>
                                <option value="Level 400">Level 400</option>
                                <option value="Diploma Year One">Diploma Year One</option>
                                <option value="Diploma Year Two">Diploma Year Two</option>
                                <option value="GAF">GAF</option>
                            </Field>
                            <ErrorMessage name="currentLevel" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label className="label" htmlFor="phoneNumber">Provide your phone number</label>
                            <Field className="input-field" type="text" id="phoneNumber" name="phoneNumber" />
                            <ErrorMessage name="phoneNumber" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label className="label" htmlFor="groupings">Groupings</label>
                            <Field as="select" className="select-field" id="groupings" name="groupings">
                                <option value="">Choose</option>
                                <option value="Group 1">Group 1</option>
                                <option value="Group 2">Group 2</option>
                                <option value="Group 3">Group 3</option>
                                <option value="Group 4">Group 4</option>
                                <option value="Group 5">Group 5</option>
                                <option value="Group 6">Group 6</option>
                                <option value="Group 7">Group 7</option>
                                <option value="Group 8">Group 8</option>
                                <option value="None of the above">None of the above</option>
                               
                            </Field>
                            <ErrorMessage name="groupings" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label className="label" htmlFor="lecturerName">Name of Lecturer</label>
                            <Field className="input-field" type="text" id="lecturerName" name="lecturerName" />
                            <ErrorMessage name="lecturerName" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label className="label" htmlFor="instructorSeen">Did you see your instructor/lecturer while completing this form?</label>
                            <Field as="select" className="select-field" id="instructorSeen" name="instructorSeen">
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Field>
                            <ErrorMessage name="instructorSeen" component="div" className="error" />
                        </div>
                        <div className="form-field">
                            <label className="label" htmlFor="courseLevel">Level of the Course</label>
                            <Field as="select" className="select-field" id="courseLevel" name="courseLevel">
                                <option value="">Select Level</option>
                                <option value="Diploma (Year 1 and 2)">Diploma (Year 1 and 2)</option>
                                <option value="Bachelors Level 100">Bachelors Level 100</option>
                                <option value="Bachelors Level 200">Bachelors Level 200</option>
                                <option value="Bachelors Level 300">Bachelors Level 300</option>
                                <option value="Bachelors Level 400">Bachelors Level 400</option>
                            </Field>
                            <ErrorMessage name="courseLevel" component="div" className="error" />
                        </div>
                         
                            <div className="form-field">
                                <label className="label" htmlFor="level400Course">Select Level 400 Course</label>
                                     <Options />
                                
                                <ErrorMessage name="level400Course" component="div" className="error" />
                            </div>
                        
                        <button className="submit-btn" type="submit" disabled={formik.isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
        {/* <Footer /> */}
        </div>
    );
};

export default UserForm;
