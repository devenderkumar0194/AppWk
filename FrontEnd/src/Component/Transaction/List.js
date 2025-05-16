import { Link } from "react-router-dom";
import AXios_Api from "../../Axios_Api";
import { useEffect, useState } from "react";
import Row from "./Row";


const TransList = () => {

    const [trns , setTrns ] = useState([]);
    
    const getTrnsList = async () => {
        const res = await AXios_Api.getTrns();
        if(res.status === "success"){
            setTrns(res.data);
        }else{
            setTrns([]);
        }
    }

    useEffect(() => {
        getTrnsList();

    } , []);


    return <>

        <div className="container ">
            <h3>Transaction List</h3>
            <Link to="/add-trans" className="btn btn-primary">Add</Link>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">credit</th>
                <th scope="col">debit</th>
                <th scope="col">balence</th>
                </tr>
            </thead>
            <tbody>


                {trns.map((trn, index) => (
                     <tr>
                        <th scope="row">{new Date(trn.createdAt).toISOString().split('T')[0] }</th>
                        <td>{trn.desc}</td>
                        <td>{trn.credit}</td>
                        <td>{trn.debit}</td>
                        <td>{trn.balence}</td>
                    </tr>
                ))}                
            </tbody>
            </table>
        </div>
    </>;

}




export default TransList;