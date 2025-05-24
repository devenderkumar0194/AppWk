import { Link } from "react-router-dom";
import AXios_Api from "../../Axios_Api";
import { useEffect, useState } from "react";
import Row from "./Row";
import Head from "../Home/Head";
import { CSVLink } from 'react-csv';


const TransList = () => {

    const [trns , setTrns ] = useState([]);
    const [page , setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const getTrnsList = async (page=1, event = null) => {

        let search = event?.target?  event.target.value.trim() : "";
        setPage(page);
        if(page > lastPage){
            setPage(lastPage);
        }

        const res = await AXios_Api.getTrns(page, search, limit);
        if(res.status === "success"){
            
            setLastPage(res.lastPage);
            setTrns(res.data);

        }else{
            setTrns([]);
        }
    }


    const downloadCSV = () => {

        const headers = Object.keys(trns[0]).join(',') + '\n';
        const rows = trns.map(row => Object.values(row).join(',')).join('\n');
        const csvContent = headers + rows;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
    }


    const handleLimit = (e) => {
        const limit = parseInt(e.target.value);
        setLimit(limit);

    }

    useEffect(() => {
        getTrnsList();
    } , [limit]);


    return <>        
        <main>
            <section>
                <div class="container">


                    <div className="tx-filter">
                        

                    </div>   

                    <div class="header">



                        <Link to="/add-trans" class="add-button">Add New Transaction</Link>  

                        <select value={limit} onChange={handleLimit}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>

                        <button onClick={downloadCSV} className="add-button">Download CSV</button>
                        
                        <div class="search-box">
                            <input onChange={(event) => getTrnsList(page, event)} type="text"   placeholder="Search description..."/>
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
                            <button disabled={page <= 1}  onClick={() => getTrnsList(page-1)} >Prev</button>
                            <button disabled={page <= 1} onClick={() => getTrnsList(page-1)} >{page - 1 }</button>
                            <button onClick={() => getTrnsList(page)} class="active">{page}</button>
                            <button disabled={page === lastPage} onClick={() => getTrnsList(page+1)} >{page + 1}</button>
                            <button disabled={page === lastPage} onClick={() => getTrnsList(page+1)} >Next</button>
                        </div>
                    </div>
            </section>
        </main>
    </>;
}




export default TransList;