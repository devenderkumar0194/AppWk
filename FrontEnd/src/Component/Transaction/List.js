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
        
        <main>
            <section>
                <div class="container">
                    <div class="header">
                        <Link to="/add-trans" class="add-button">Add New Transaction</Link>            
                        <div class="search-box">
                            <input type="text" placeholder="Search description..."/>
                        </div>
                    </div>
                    
                    <table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Description</th>
                        <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>

                        {trns.map((trn, index) => (
                            <Row key={index} trn={trn} />
                        ))}

                    </tbody>
                    </table>

                    <div class="pagination">
                    <button class="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>Next</button>
                    </div>
                    </div>



            </section>

        </main>
    </>;

}




export default TransList;