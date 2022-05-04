import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "../App.css";

const OneFinanceDetail = () => {

    const { _id } = useParams();
    const [info, setInfo] = useState({})
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/finances/${_id}`)
            .then(res => {
                console.log("Response->", res)
                setInfo(res.data.finance);
            })
            .catch(err => {
                console.log("ERROR OCCUR!->", err)
            })

    }, [])

    const deleteFinance = () => {
        console.log("Deleting This Finance ->", _id)
        axios.delete(`http://localhost:8000/api/finances/delete/${_id}`)
            .then(res => {
                console.log(res);
                history.push("/");
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='detailfinance signin-container'>
            <div className='container2'>
                <div className=''>
                    <h2 className='fontColor m-3'><b>Details About: </b>{info.name}</h2>
                    <button onClick={deleteFinance} className='btn btn-danger m-3'>Delete {info.name}</button>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <p><b>Date:</b> {info.date}</p>
                        <p><b>Category:</b> {info.category}</p>
                        <p><b>Amount:</b> {info.amount}</p>
                        <div className='d-flex justify-content-center'>
                            {info.name} <i className="material-icons" style={{color:"red"}}>favorite</i>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OneFinanceDetail;