import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import Dashboard from './Dashboard';
import Moment from 'react-moment';

const AllFinances = (props) => {

    const [financeList, setFinanceList] = useState([]);
    // const [selectedType, setSelectedType] = useState("");
    const { setSelectedType, selectedType } = props;

    const updateSelectedType = (filterType) => {
        console.log("Filter By ->", filterType)
        setSelectedType(filterType)
    }


    useEffect(() => {
        axios.get("http://localhost:8000/api/finances/user", {withCredentials:true})
            .then(res => {
                console.log("Response-->", res)
                if (selectedType.length > 0) {
                    let filteredList = res.data.finance.filter((transaction) => {
                        return transaction.category == selectedType
                    })
                    setFinanceList(filteredList)
                } else {
                    setFinanceList(res.data.finance);
                }
            })
            .catch(err => {
                console.log("ERROR OCCUR!", err)
            })
    }, [props.formSubmitted, props.selectedType])

    const refreshPage = () => {
        window.location.reload(false);
    }

    return (
        <>
            <div className='myfinance signin-container'>
                <div className='container'>
                    <Dashboard setLoggedInUser = {props.setLoggedInUser}></Dashboard> <br />
                    <div className='d-flex p-3 justify-content-between'>
                        <button onClick={refreshPage} className="btn--outline btn-medium">Show All</button>
                        <button onClick={() => updateSelectedType("Clothing")} className="btn--outline btn-medium">Clothing</button>
                        <button onClick={() => updateSelectedType("Shoes")} className="btn--outline btn-medium">Shoes</button>
                        <button onClick={() => updateSelectedType("Food")} className="btn--outline btn-medium">Food</button>
                        <button onClick={() => updateSelectedType("Utilities")} className="btn--outline btn-medium">Utilities</button>
                        <button onClick={() => updateSelectedType("Transportation")} className="btn--outline btn-medium">Transportation</button>
                        <button onClick={() => updateSelectedType("Saving")} className="btn--outline btn-medium">Saving</button>
                        <button onClick={() => updateSelectedType("Insurance")} className="btn--outline btn-medium">Insurance</button>
                        <button onClick={() => updateSelectedType("Medical")} className="btn--outline btn-medium">Medical</button>
                    </div>
                    <h3 className='p-3'>Sorted By: {selectedType}</h3>
                    <table className="table fontColor">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Catergory</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                financeList.map((financeObj) => {
                                    return (
                                        <tr key={financeObj._id}>
                                            <td><p className='mt-3'>{financeObj.name}</p></td>
                                            <td><p className='mt-3'><Moment format='MMMM Do YYYY'>{financeObj.date}</Moment></p></td>
                                            <td><p className='mt-3'>{financeObj.category}</p></td>
                                            <td><p className='mt-3'>${financeObj.amount}</p></td>
                                            <td>
                                                <Link to={`/finances/${financeObj._id}`} className="btn btn-warning m-3">Details</Link> |
                                                <Link to={`/finances/${financeObj._id}/edit`} className='btn btn-warning m-3'>Edit </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default AllFinances;