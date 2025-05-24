import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_BACK_END_URL+'/api'; 


const register = async (obj) => {
    
    try {

        const res = await axios.post(
        baseURL+'/register',
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


const login = async (email, password) => {

    const obj =  {
      email: email,
      password: password
    }
    
    try {

        const res = await axios.post(
        baseURL+'/login',
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

const getUserDetails  = async () => {
    
    const token = Cookies.get('token');
    try {

        const res = await axios.get(baseURL+'/user-detiails', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });

        return res.data;

    } catch (err) {
        if(err.response.status === 409){
            return err.response.data;
        }
    }

}

const logout = async () => {

    Cookies.remove('token');
    const res =  await axios.get(baseURL+'/logout', {}, { withCredentials: true });
    return res.data;    
}





const getTrns = async (page = 1, search) => {
    
    const token = Cookies.get('token');
    try {

        var obj = {
            page : page,
            limit : 10,
        }

        if(search){
            obj.search = search;
        }

        // obj.startDate =  "2024-12-31";
        // obj.endDate = "2024-12-31";

        const res = await axios.get(baseURL+'/trns-list',  {
            params : obj,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;

    } catch (err) {
        if(err.response.status === 409){
            return err.response.data;
        }
    }

}

const addTrns = async (obj) => {
    try {
        const token = Cookies.get('token');
        const res = await axios.post(
        baseURL+'/add-trns',
        obj,
        {
            headers: {
            Authorization: `Bearer ${token}`,
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



const obj = { register, login , logout, getUserDetails,getTrns, addTrns};

export default obj;