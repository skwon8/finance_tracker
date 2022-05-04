import React from "react";
import { Bar } from "react-chartjs-2";
const MixedChart = (props) => {
    return (
        <div className="charts-card">
            <Bar
                data={props.data}

            />
        </div>
    );
};
export default MixedChart;