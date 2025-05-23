import Head from "./Head";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios_API from '../../Axios_Api';
import { useNavigate } from 'react-router-dom';

const Login = () => {

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
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        }),
        onSubmit: async (values) => {

            console.log('===>>>>',values);
         
            // const object = {
            //     "desc" : values.desc,
            //     "credit" : values.type === "1" ? values.amount : 0,
            //     "debit" : values.type === "2" ? values.amount : 0,   
            // }

            // const res = await Axios_API.addTrns(object);
            // if(res.status === "success"){
                navigate('/trns-list');
            // }
        }
      });

    //   const CancelTransaction = () => {  
    //     formik.resetForm();
    //   }

    return <>
        <Head title="Please Log In to Continue" subTitle="Access your TrackWise dashboard to manage your credits, debits, and balance with ease."/>

        <main>

            <section>
            <div className="box-100">
            <form onSubmit={formik.handleSubmit}>
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