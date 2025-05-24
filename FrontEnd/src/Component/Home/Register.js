import Head from "./Head"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios_API from '../../Axios_Api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";

const Register = () => {

    const location = useLocation();
    const message = location.state?.message;
    const [error , setError] = useState(location.state?.error);
    const navigate = useNavigate();
    
    const initialValues = {
        name : "",
        email : "",
        password: "",
        confirm_password: "",

    };
        
        const formik = useFormik({
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            name: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .required('Name is required'),
            email: Yup.string()
            .email('Invalid email format')
            .min(3, 'Must be at least 3 characters')
            .required('Email is required'),
            password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
            confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        }),
        onSubmit: async (values) => {

            console.log('===>>>>',values);
            
            const object = {
                name : values.name,
                email : values.email,
                password : values.password,
                confirm_password : values.confirm_password,
                user_type : "user"
            }
            const res = await Axios_API.register(object);
            if(res.status === 200){
                navigate('/login', { state : { message : "Your account register successfully"}});
            }else {

                if(res.status === "error"){
                    setError(res.message);
                }
                // navigate('/register', { state : { error : "Something went wrong!"}});                   
            }
        }
        });
    
        //   const CancelTransaction = () => {  
        //     formik.resetForm();
        //   }

    return <>
        <Head title="Create Your Free TrackWise Account" subTitle="Start tracking your income and expenses today, it's simple, fast, and always free."/>
        <main>
            <section>
            <div className="container">
            <form onSubmit={formik.handleSubmit}>

                {message && <div className="success">{message}</div>}
                {error && <div className="error">{error}</div>}

                <div class="form-group">
                    <label for="name">Name</label>
                    <input autoComplete="off" type="text" id="name" placeholder="" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="error">{formik.errors.name}</div>
                    )}
                
                </div>



                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input autoComplete="off" type="email" id="email" placeholder="you@example.com" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="error">{formik.errors.email}</div>
                    )}
                
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input autoComplete="off" type="password" id="password" placeholder="••••••••"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="error">{formik.errors.password}</div>
                    )}

                </div>

                <div class="form-group">
                    <label for="password">Confirm Password</label>
                    <input autoComplete="off" type="password" id="confirm_password" placeholder="••••••••"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirm_password}
                    />
                    {formik.touched.confirm_password && formik.errors.confirm_password && (
                        <div className="error">{formik.errors.confirm_password}</div>
                    )}

                </div>



                   <div className="form-btn">
                        <button type="submit" class="login-btn">Register</button>
                    </div> 
                </form>
            </div>
            </section>
        </main>



    </>;
}

export default Register;