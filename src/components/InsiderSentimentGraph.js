import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function InsiderSentimentGraph({ data }) {
    if (!data || data.length === 0) {
        return <p>No insider sentiment data available.</p>;
    }

    const formattedData = data.map((entry) => ({
        month: `${entry.year}-${entry.month}`,
        mspr: entry.mspr,
    }));

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
                    <YAxis
                        label={{
                            value: "MSPR",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="mspr" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default InsiderSentimentGraph;
