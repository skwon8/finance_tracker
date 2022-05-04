import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import axios from 'axios';

import AllFinances from './components/AllFinances';
import FinanceForm from './components/FinanceForm';
import OneFinanceDetail from './components/OneFinanceDetail';
import EditFinanceForm from './components/EditFinanceForm';
import Home from './components/pages/Home';
import SignIn from './components/SignIn';
import About from './components/About';
import Main from './components/MainShowChart';
import MainShowChart from './components/MainShowChart';

function App() {

  let [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  let[loggedInUser, setLoggedInUser] = useState(null);

  useEffect( () => {
      axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials: true})
          .then(res => {
              console.log("Response when getting Logged In User", res)
              if (res.data.results) {
                  setLoggedInUser(res.data.results)
              }
          })
          .catch(err => {
              console.log("Error when getting Logged In User", err)
              // history.push("/")
          })
  }, [])

  return (
    <BrowserRouter>
        <Navbar loggedInUser = {loggedInUser}></Navbar>
      <div className="App">
        <Switch>
          <Route path = '/' exact component = {Home} />
          <Route exact path="/signup">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/about">
            <About></About>
          </Route>
          <Route exact path="/chart">
            <MainShowChart></MainShowChart>
          </Route>
          <Route exact path ="/finances">
            <AllFinances setLoggedInUser={setLoggedInUser} formSubmitted={formSubmitted} selectedType = {selectedType} setSelectedType = {setSelectedType}></AllFinances>
          </Route>
          <Route exact path="/finances/new">
            <FinanceForm formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></FinanceForm>
          </Route>
          <Route exact path="/finances/:_id">
            <OneFinanceDetail></OneFinanceDetail>
          </Route>
          <Route exact path="/finances/:_id/edit">
            <EditFinanceForm></EditFinanceForm>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
