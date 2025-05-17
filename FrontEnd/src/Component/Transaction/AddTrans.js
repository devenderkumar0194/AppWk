
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios_API from '../../Axios_Api';
import { useNavigate } from 'react-router-dom';

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
            .required('description is required'),
            
            type: Yup.string().required('Type is required'),

            amount: Yup.number()
                .required('amount is required')
    
            .typeError('amount must be a number')
              .min(1, 'amount must be 1 or more')
        }),
        onSubmit: async (values) => {
         
            const object = {
                "desc" : values.desc,
                "credit" : values.type === "1" ? values.amount : 0,
                "debit" : values.type === "2" ? values.amount : 0,   
            }

            const res = await Axios_API.addTrns(object);
            if(res.status === "success"){
                navigate('/');
            }
        }
      });

      const CancelTransaction = () => {
        
        formik.resetForm();
        
      }

    return <>

                <div className='container add-trnx'>
                    <div className='row'><h3>New Transaction</h3></div>
                    
                    <form onSubmit={formik.handleSubmit}>
                        <div className='row'>
                            <div className='col-4'><label>Transaction Type</label></div>
                            <div className='col-8'>
                                <div className='form-group'>

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
                                    <div style={{ color: 'red' }}>{formik.errors.type}</div>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                        <div className='row'>

                            <div className='col-4'><label>Amount</label></div>
                            <div className='col-8'>
                                <div className='form-group'>
                                    <input
                                    className='form-control'
                                    type="text"
                                    name="amount"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.amount}
                                    />
                                    {formik.touched.amount && formik.errors.amount && (
                                    <div style={{ color: 'red' }}>{formik.errors.amount}</div>
                                    )}
                                
                                
                                </div>  
                            </div>
                        </div>
                        <div className='row'>

                            <div className='col-4'><label>Description:</label></div>
                            <div className='col-8'>
                                    <div className='form-group'>
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
                            </div>

                        </div>
                        <div className='row'>

                            <div className='from-group add-box'>
                                <button className='btn btn-primary mx-2' type="submit">Add Transaction</button>
                            
                                <a className='btn btn-danger' onClick={CancelTransaction}>Cancel</a>
                            
                            </div>
                        

                        </div>
                    


                    </form>

                    

                </div>


                


                    





    </>; 
}

export default AddTrans;