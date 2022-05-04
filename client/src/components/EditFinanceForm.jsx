import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";


const EditFinanceForm = () => {

    let [financeInfo, setFinanceInfo] = useState({
        name: "",
        date: "",
        category: "",
        amount: ""
    })

    let { _id } = useParams();

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/finances/${_id}`)
            .then(res => {
                console.log("Response->", res);
                setFinanceInfo(res.data.finance)
            })
            .catch(err => {
                console.log("ERROR OCCUR!->", err);
            })
    }, [])

    const changeHandler = (e) => {
        setFinanceInfo({
            ...financeInfo,
            [e.target.name]: e.target.value
        })
    }


    const updateFinance = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/finances/update/${_id}`, financeInfo)
            .then(res => {
                console.log("Updated ->", res)
                history.push('/finances')
            })
            .catch(err => {
                console.log("ERROR OCCUR IN UPDATE!", err)
            })
    }

    return (
        <div className='editfinance signin-container'>
            
            <div className='container'>
                <h2 className='d-flex justify-content-start fontColor m-3'>Edit {financeInfo.name}</h2>
                <form onSubmit={updateFinance}>
                    <div className='card'>
                        <div className="card-body">
                            <label htmlFor=""><b>Name:</b></label>
                            <input type="text" name="name" id="" className="form-control" onChange = {changeHandler} value={financeInfo.name}/>
                        </div>
                        <div className="card-body">
                            <label htmlFor=""><b>Date:</b></label>
                            <input type="date" name="date" id="" className="form-control" onChange={changeHandler} value={financeInfo.date} />
                        </div>
                        <div className="card-body">
                            <label htmlFor=""><b>Category:</b></label>
                            <input type="text" name="category" id="" className="form-control" onChange={changeHandler} value={financeInfo.category} />
                        </div>
                        <div className="card-body">
                            <label htmlFor=""><b>Amount:</b></label>
                            <input type="number" name="amount" id="" className="form-control" onChange={changeHandler} value={financeInfo.amount} />
                        </div>
                    </div>
                    <input className='m-3 btn btn-warning' type="submit" value="Submit Edit" />
                </form>
            </div>
        </div>
    );
};

export default EditFinanceForm;