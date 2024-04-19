// src/Login.js
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from './App';  // Import the AuthContext

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username too short!')
        .max(50, 'Username too long!')
        .required('Username is required'),
    password: Yup.string()
        .min(4, 'Password must be at least 4 characters long')
        .required('Password is required'),
});

const Login = () => {
    const auth = useContext(AuthContext);  // Use AuthContext to manage login state

    return (
        <div style={{ width: '300px', margin: '100px auto' }}>
            <h2>Login</h2>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    alert('Login Successful: ' + JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    auth.setLoggedIn(true);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <Field name="username" type="text" />
                            <ErrorMessage name="username" component="div" />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
