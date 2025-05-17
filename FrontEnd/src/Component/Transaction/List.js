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
        <div className="container tx-list">
            <div className="row">
                <div className="col-8"><h3>Transaction List</h3></div>
                <div className="col-4"><Link to="/add-trans" className="btn btn-primary">Add</Link></div>
            </div>
            
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Credit</th>
                <th scope="col">Debit</th>
                <th scope="col">Balence</th>
                </tr>
            </thead>
            <tbody>


                {trns.map((trn, index) => (
                     <tr>
                        <th scope="row">{new Date(trn.createdAt).toISOString().split('T')[0] }</th>
                        <td>{trn.desc}</td>
                        <td>{trn.credit?trn.credit:""}</td>
                        <td>{trn.debit?trn.debit:""}</td>
                        <td>{trn.balence}</td>
                    </tr>
                ))}                
            </tbody>
            </table>
        </div>
    </>;

}




export default TransList;