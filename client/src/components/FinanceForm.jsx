import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import '../App.css';


const FinanceForm = (props) => {

    let [name,setName] = useState("");
    let [date,setDate] = useState("");
    let [category,setCategory] = useState("Clothing");
    let [amount,setAmount] = useState("");
    let [formErrors, setFormErrors] = useState({})


    const history = useHistory();

    const createFinance = (e)=>{
        e.preventDefault();

        let formInfo = {name, date, category, amount};

        axios.post("http://localhost:8000/api/finances",formInfo, {withCredentials:true})
            .then(res=>{
                console.log("Posting Finance!-->", res);
                if(res.data.error){
                    setFormErrors(res.data.error.errors);
                } else {
                    props.setFormSubmitted(!props.formSubmitted)
                    
                    setName("");
                    setDate("");
                    setCategory("");
                    setAmount("");
                    setFormErrors({});

                    history.push("/finances")
                }
            })
            .catch(err=>{
                console.log("ERROR OCCUR! Finance FORM->", err);
            })
    }

    return (
        <>
            <div className='addyourspend signin-container1'>
            <div className='container container2'>
                <form onSubmit={createFinance}>
                    <h2>EASY WAY TO TRACK YOUR FINANCE</h2>
                    <div className='card'>
                        <div className="card-body">
                        <h4 className='mb-3'>WHAT YOU SPEND ON?</h4>
                            <label className='mb-3' htmlFor=""><b>Name:</b></label>
                            <input type="text" name="" id="" className="form-control" onChange={(e)=>{setName(e.target.value)}} value={name} />
                            <p className="text-warning">{formErrors.name?.message}</p>
                        </div>
                        <div className="card-body">
                            <label className='mb-3' htmlFor=""><b>Date:</b></label>
                            <input type="date" name="" id="" className="form-control" onChange={(e)=>{setDate(e.target.value)}} value={date} />
                            <p className="text-warning">{formErrors.date?.message}</p>
                        </div>
                        <div className="card-body">
                            <label className='mb-3' htmlFor=""><b>Category:</b></label> <br/>
                            <select className="form-control" onChange={(e)=>{setCategory(e.target.value)}}>
                                <option value="Clothing">Clothing</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Food">Food</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Saving">Saving</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Medical">Medical</option>
                            </select>
                            {/* <input type="text" name="" id="" className="form-control" onChange={(e)=>{setCategory(e.target.value)}} value={category} /> */}
                            <p className="text-warning">{formErrors.category?.message}</p>
                        </div>
                        <div className="card-body">
                            <label className='mb-3' htmlFor=""><b>Amount:</b></label>
                            <input type="number" name="" id="" className="form-control" onChange={(e)=>{setAmount(e.target.value)}} value={amount} />
                            <p className="text-warning">{formErrors.amount?.message}</p>
                        </div>
                    </div>
                    <input className='m-3 btn btn-primary' type="submit" value="Add to the LIST" />
                </form>
            </div>
        </div>
        </>
        
    );
};

export default FinanceForm;