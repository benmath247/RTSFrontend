import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function StockBarGraph({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 35 }}>
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="strongBuy" fill="#4caf50" name="Strong Buy" stackId="a" />
                <Bar dataKey="buy" fill="#8bc34a" name="Buy" stackId="a" />
                <Bar dataKey="hold" fill="#ffc107" name="Hold" stackId="a" />
                <Bar dataKey="sell" fill="#ff5722" name="Sell" stackId="a" />
                <Bar dataKey="strongSell" fill="#f44336" name="Strong Sell" stackId="a" />
                <Legend align="center" verticalAlign="bottom" layout="horizontal" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default StockBarGraph;
