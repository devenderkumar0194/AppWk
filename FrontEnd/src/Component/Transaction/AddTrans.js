
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios_API from '../../Axios_Api';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../Home/Head';
const AddTrans = () => {
    
    const navigate = useNavigate();

    const initialValues = {
        desc : '',
        type: "",
        amount: ""
    };
    
        const formik = useFormik({
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          desc: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .required('Description is required'),
            
            type: Yup.string().required('Type is required'),

            amount: Yup.number()
                .required('Amount is required')
    
            .typeError('Amount must be a number')
              .min(1, 'Amount must be 1 or more')
        }),
        onSubmit: async (values) => {
         
            const object = {
                "desc" : values.desc,
                "credit" : values.type === "1" ? values.amount : 0,
                "debit" : values.type === "2" ? values.amount : 0,   
            }

            const res = await Axios_API.addTrns(object);
            if(res.status === "success"){
                navigate('/trns-list');
            }
        }
      });

      const CancelTransaction = () => {  
        formik.resetForm();
      }

    return <>
        <main>
            <div className='container'>
                    <div class="header">
                        {/* <Link to="/trns-list" class="add-button">Transaction List</Link>             */}
                        <div class="search-box add-trx">
                            <Link to="/trns-list" class="add-button">Transaction List</Link>            

                            {/* <input type="text" placeholder="Search description..."/> */}
                        </div>
                    </div>


                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <label>Transaction Type</label>
                            <select className='form-control' name='type'
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select Type</option>
                                <option value="1">Credit</option>
                                <option value="2">Debit</option>
                            </select>
                            {formik.touched.type && formik.errors.type && (
                            <div className='error'>{formik.errors.type}</div>
                            )}
                        </div>

                        <div className='form-group'>
                            <label>Amount</label>
                            <input
                                autoComplete='off'
                                className='form-control'
                                type="text"
                                name="amount"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.amount}
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                <div className='error'>{formik.errors.amount}</div>
                                )}

                        </div>

                        <div className='form-group'>
                            <label>Description</label>
                            <textarea
                                autoComplete='off'
                                className='form-control'
                                name="desc"
                                rows="4"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.desc}
                                />

                                {formik.touched.desc && formik.errors.desc && (
                                <div className='error'>{formik.errors.desc}</div>
                                )}
                        </div>

                        <div className="form-btn">
                            <button type="submit" class="login-btn">Add Transaction</button>
                            <a className='btn btn-danger' onClick={CancelTransaction}>Cancel</a>

                        </div>


                    </form>
                </div>



        </main>
                
    </>; 
}

export default AddTrans;