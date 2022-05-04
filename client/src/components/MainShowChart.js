import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import MixedChart from "./MixedChart";
import Chart from 'chart.js/auto';
import "../App.css";
import moment from "moment";


const MainShowChart = (props) => {
    const [monthdata, setMonthData] = useState([])
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/finances/user", {withCredentials:true})
            .then(res => {
                console.log("Response-->", res)
                let monthObj = {
                    "January":0,
                    "February":0,
                    "March":0,
                    "April":0,
                    "May":0,
                    "June":0,
                    "July":0,
                    "August":0,
                    "September":0,
                    "October":0,
                    "November":0,
                    "December":0,
                }
                res.data.finance.forEach(expense=>{
                    console.log('inside foreach ' , expense)
                    let month = moment(expense.date).format('MMMM');
                    // expense.date.slice(5,7)
                    monthObj[month] += expense.amount;
                })
                console.log('month obj -->', monthObj)
                //we need to get all the values from our monthobj and put them in an array
                let monthValue = Object.values(monthObj);
                console.log(monthValue);
                setMonthData(monthValue);
                setLoaded(true);
            })
            .catch(err => {
                console.log("ERROR OCCUR!", err)
            })
    }, [props.formSubmitted, props.selectedType])

    // const clothing = [3, 1, 5, 8, 20, 10, 15, 30, 20, 6, 50, 20];
    // const shoes = [2, 3, 10, 5, 5, 9, 10, 10, 5, 15, 20, 25];
    // const food = [2, 3, 10, 5, 5, 9, 10, 10, 30, 14, 23, 12];
    // const utilities = [2, 3, 10, 5, 5, 9, 10, 10, 40, 45, 50, 43];
    // const transportation = [2, 3, 10, 5, 5, 9, 10, 10, 30, 60, 40, 60];
    // const saving = [2, 3, 10, 5, 5, 9, 10, 10, 20, 50, 30, 40, 20];
    // const insurance = [2, 3, 10, 5, 5, 9, 10, 10, 10, 10, 10, 10];
    // const medical = [2, 3, 10, 5, 5, 9, 10, 10, 20, 20, 20, 20];
    // const total = clothing.map((num, idx) => num + shoes[idx] + food[idx] + utilities[idx] + transportation[idx] + saving[idx] + insurance[idx] + medical[idx]);
    // //Inside data props
    
    function displayMonthlyChart(){
        // const total = monthdata.map((January) => January + February + March + April + May + June + July + August + September + October + November+ December);
        const monthdataObj = {

            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            
            datasets: [
                {
                    label: "Monthly Spending Chart",
                    data: monthdata,
                    backgroundColor: "rgba(87, 150, 234, 0.6)",
                    borderColor: "rgba(87, 121, 234, 0.6)",
                    order: 1,
                },
                // {
                //     label: "Total",
                //     data: total,
                //     backgroundColor: "rgba(234, 87, 102, 0.6)",
                //     borderColor: "rgba(234, 87, 102, 0.6)",
                //     fill: false,
                //     pointHoverRadius: 25,
                //     pointHoverBorderWidth: 5,
                //     type: "line",
                //     order: 0,
                // },
            ]
        }
        return <MixedChart data={monthdataObj} />
    //     const data = {

    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",  ],
    //     datasets: [
    //     {
    //         label: "Clothing",
    //         data: clothing,
    //         backgroundColor: "rgba(87, 150, 234, 0.6)",
    //         borderColor: "rgba(87, 121, 234, 0.6)",
    //         order: 1,
    //     },
    //     {
    //         label: "Shoes",
    //         data: shoes,
    //         backgroundColor: "rgba(226, 240, 30, 0.3)",
    //         borderColor: "rgba(18, 200, 150, 0.6)",
    //         order: 1,
    //     },
    //     {
    //         label: "Food",
    //         data: food,
    //         backgroundColor: "rgba(240, 163, 30, 0.3)",
    //         borderColor: "rgba(18, 200, 150, 0.6)",
    //         order: 1,
    //     },
    //     {
    //         label: "Utilities",
    //         data: utilities,
    //         backgroundColor: "rgba(136, 40, 220, 0.6)",
    //         borderColor: "rgba(18, 200, 150, 0.6)",
    //         order: 1,
    //     },
    //     {
    //         label: "Transportation",
    //         data: transportation,
    //         backgroundColor: "rgba(40, 112, 220, 0.6)",
    //         borderColor: "rgba(40, 112, 220, 0.6)",
    //         order: 1,
    //     },
    //     {
    //         label: "Saving",
    //         data: saving,
    //         backgroundColor: "rgba(190, 220, 40, 0.6)",
    //         borderColor: "rgba(18, 200, 150, 0.6)",
    //         order: 1,
    //     },
    //     {
    //         label: "Insurance",
    //         data: insurance,
    //         backgroundColor: "rgba(40, 220, 202, 0.6)",
    //         borderColor: "rgba(18, 200, 150, 0.6)",
    //         order: 1,
    //     },
    //     {
    //         label: "Medical",
    //         data: medical,
    //         backgroundColor: "rgba(255, 0, 0, 0.4)",
    //         borderColor: "rgba(18, 200, 150, 0.6)",
    //         order: 1,
    //     },
    //     {
    //         label: "Total",
    //         data: total,
    //         backgroundColor: "rgba(234, 87, 102, 0.6)",
    //         borderColor: "rgba(234, 87, 102, 0.6)",
    //         fill: false,
    //         pointHoverRadius: 25,
    //         pointHoverBorderWidth: 5,
    //         type: "line",
    //         order: 0,
    //     },
    // ],
    // };
}
    


    return (
    <div>
        <Link to = '/finances' className="d-flex justify-content-center btn btn-medium btn-warning p-3">Go Back To My Finance</Link>
        {/* <MixedChart data={data} /> */}
        {displayMonthlyChart()}
    </div>
);
};

export default MainShowChart;