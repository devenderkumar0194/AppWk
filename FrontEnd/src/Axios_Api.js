import axios from 'axios';
// import Cookies from 'js-cookie';

const baseURL = 'http://localhost:5000/api'; 

const getTrns = async () => {
    
    const res  = await axios.get(baseURL+'/trns-list');
    return res.data;

}

const addTrns = async (obj) => {
    
    try {

        const res = await axios.post(
        baseURL+'/add-trns',
        obj,
        {
            headers: {
            //Authorization: 'Bearer YOUR_TOKEN_HERE',
            'Content-Type': 'application/json',
            },
        }
        );

        return res.data;

    } catch (err) {
        if(err.response.status === 409){
            return err.response.data;
        }
    }
    
}


const obj = { getTrns, addTrns};

export default obj;