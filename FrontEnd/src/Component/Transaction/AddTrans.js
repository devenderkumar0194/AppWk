
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios_API from '../../Axios_Api';
import { useNavigate } from 'react-router-dom';

const AddTrans = () => {
    
    const navigate = useNavigate();

    const initialValues = {
        desc : '',
        credit: 0,
        debit: 0
    };
    
        const formik = useFormik({
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          desc: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .required('description is required'),
            
            credit: Yup.number()
            .typeError('credit must be a number')
              .min(0, 'credit must be 0 or more'),

            debit: Yup.number()
            .typeError('debit must be a number')
              .min(0, 'credit must be 0 or more')

        }),
        onSubmit: async (values) => {
            const res = await Axios_API.addTrns(values);
            if(res.status === "success"){
                navigate('/');
            }
        }
      });

    return <>

                <div className='container'>
                    <h3>New Transaction</h3>

                    <form onSubmit={formik.handleSubmit}> 
                        
                        <div className='form-group'>
                            <label>credit:</label><br />
                            <input
                            className='form-control'
                            type="text"
                            name="credit"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.credit}
                            />
                            {formik.touched.credit && formik.errors.credit && (
                            <div style={{ color: 'red' }}>{formik.errors.credit}</div>
                            )}
                        </div>


                        <div className='form-group'>
                            <label>debit:</label><br />
                            <input
                            className='form-control'
                            type="text"
                            name="debit"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.debit}
                            />
                            {formik.touched.debit && formik.errors.debit && (
                            <div style={{ color: 'red' }}>{formik.errors.debit}</div>
                            )}
                        </div>

 <div className='form-group'>
                            <label>Description:</label><br />
                            <input
                            className='form-control'
                            type="text"
                            name="desc"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.desc}
                            />
                            {formik.touched.desc && formik.errors.desc && (
                            <div style={{ color: 'red' }}>{formik.errors.desc}</div>
                            )}
                        </div>






                        <div className='from-group'>
                            <button className='btn btn-primary' type="submit">Submit</button>
                        </div>
                        
                    </form>

                </div>


                    





    </>; 
}

export default AddTrans;