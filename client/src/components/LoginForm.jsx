import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const LoginForm = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [loginFormErrors, setLoginFormErrors] = useState({})

    const history = useHistory();

    const loginHandler = (e) => {
        e.preventDefault();
        let formInfo = {email, password};
        axios.post("http://localhost:8000/api/users/login", formInfo, {withCredentials: true})
            .then (res => {
                console.log("Response when Logging In!", res)
                if(res.data.error) {
                    setLoginFormErrors(res.data.error)
                } else {
                    history.push("/finances")
                }
            })
            .catch (err => {
                console.log("Error when Logging In!", err)
            })
    }

    return (
        <div>
            <h3><b>Login</b></h3>
            <form onSubmit={loginHandler}>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" id="" className='form-control ' onChange = {(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>  
                    <input type="password" name="password" id="" className='form-control ' onChange = {(e) => setPassword(e.target.value)} />
                </div>
                {/* <p className="text-danger">{loginFormErrors}</p> */}
                <input type="submit" value="Login" className="btn btn-primary mt-3" />
            </form>
        </div>
    );
};

export default LoginForm;