import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const RegistrationForm = () => {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");

    let [formErrors, setFormErrors] = useState({});

    const history = useHistory();

    const registerHandler = (e) => {
        e.preventDefault();
        let formInfo = {firstName, lastName, email, password, confirm};
        axios.post("http://localhost:8000/api/users/register", formInfo, {withCredentials: true})
            .then(res => {
                console.log("Response after Register ->", res)
                if (res.data.errors) {
                    setFormErrors(res.data.errors)
                } else {
                    history.push("/finances")
                }
            })
            .catch(err => {
                console.log("Error after Register ->", err)
            })
    }

    return (
        <div>
            <h3><b>Register</b></h3>
            <form onSubmit = {registerHandler}>
                <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input type="text" name = "firstName" id = "" className = 'form-control ' onChange = {(e) => setFirstName(e.target.value)}/>
                    <p className="text-warning">{formErrors.firstName?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input type="text" name = "lastName" id = "" className = 'form-control 'onChange = {(e) =>setLastName(e.target.value)}/>
                    <p className="text-warning">{formErrors.lastName?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" name = "email" id = "" className = 'form-control 'onChange = {(e) =>setEmail(e.target.value)}/>
                    <p className="text-warning">{formErrors.email?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name = "password" id = "" className = 'form-control 'onChange = {(e) =>setPassword(e.target.value)}/>
                    <p className="text-warning">{formErrors.password?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name = "confirm" id = "" className = 'form-control 'onChange = {(e) =>setConfirm(e.target.value)}/>
                    <p className="text-warning">{formErrors.confirm?.message}</p>

                </div>
                <input type="submit" value="Create an Account" className="btn btn-primary" />
            </form>
        </div>
    );
};


export default RegistrationForm;