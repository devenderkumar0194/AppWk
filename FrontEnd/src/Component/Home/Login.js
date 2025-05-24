import Head from "./Head";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios_API from '../../Axios_Api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Cookies from 'js-cookie';
import { useAuth } from "../../AuthContext";

const Login = () => {

    const { isAuthenticated,setIsAuthenticated, user, setUser} = useAuth();

    const location = useLocation();
    const message = location.state?.message;

    const [error , setError] = useState(location.state?.error);
    const navigate = useNavigate();

    const initialValues = {
        email : '',
        password: "",
    };
    
        const formik = useFormik({
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          email: Yup.string()
            .email('Invalid email format')
            .min(3, 'Must be at least 3 characters')
            .required('Email is required'),
           password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .required('Password is required'),
        }),
        onSubmit: async (values) => {
            
            const res = await Axios_API.login(values.email, values.password);
            if(res.status === 200){
                const token = res.data;
                Cookies.set('token', token, { expires: 1 });
                setIsAuthenticated(true);
                navigate('/trns-list');
            }else {
                setError(res.message);
                setIsAuthenticated(false);
                setTimeout(function(){
                    setError("");
                }, 5000);
            }
        }
      });

    //   const CancelTransaction = () => {  
    //     formik.resetForm();
    //   }

    return <>
        <Head title="Please Log In to Continue" subTitle="Access your TrackWise dashboard to manage your credits, debits, and balance with ease."/>

        <main>

            <section>
            <div className="container">

                
            <form onSubmit={formik.handleSubmit}>

                {message && <div className="success">{message}</div>}
                {error && <div className="error">{error}</div>}
                <div className="form-group">
                    <div className="error">{error}</div>
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

                   <div className="form-btn">
                        <button type="submit" class="login-btn">Log In</button>
                    </div> 
                </form>
            </div>
            </section>
        </main>


    </>;
}

export default Login;