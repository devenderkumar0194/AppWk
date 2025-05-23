import { Link } from "react-router-dom";
import AXios_Api from "../../Axios_Api";
import { useEffect, useState } from "react";
import Row from "./Row";
import Head from "../Home/Head";


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

        <Head title="Transaction List" subTitle="All your credits and debits, clearly organized and always accessible."/>
        <div className="container tx-list">
            <div className="row">
                <div className="col-8"><h3>Transaction List</h3></div>
                <div className="col-4"><Link to="/add-trans" className="btn btn-primary">Add Transaction </Link></div>
            </div>

            <div className="row">
                <table className="table table-responsive">
                    <thead>
                        <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Debit</th>
                        <th scope="col">Balance</th>
                        </tr>
                    </thead>
                    <tbody>

                        {trns.map((trn, index) => (
                            <Row key={index} trn={trn} />
                        ))}             
                    </tbody>
                </table>
            </div>
        </div>
    </>;

}




export default TransList;