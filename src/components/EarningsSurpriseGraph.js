import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function EarningsSurpriseGraph({ data }) {
    const formattedData = data.map(item => ({
        period: item.period,
        actual: item.actual,
        estimate: item.estimate,
        result: item.actual > item.estimate ? "Beat" : "Missed",
    }));

    const actualValues = formattedData.map(item => item.actual);
    const estimateValues = formattedData.map(item => item.estimate);
    const allValues = [...actualValues, ...estimateValues];
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis
                    dataKey="period"
                    name="Period"
                    label={{ value: "Earnings Period", position: "insideBottom", offset: -5 }}
                    tick={{ fontSize: 10 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    domain={[0, formattedData.length - 1]}
                />
                <YAxis
                    name="Value"
                    domain={[Math.floor(minValue), Math.ceil(maxValue)]}
                    label={{ value: "Earnings Value", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                    formatter={(value, name) => [`${value}`, name]}
                    labelFormatter={(label) => `Period: ${label}`}
                />
                <Legend verticalAlign="top" height={36} />
                <Scatter name="Actual" data={formattedData} dataKey="actual" fill="#4caf50" />
                <Scatter name="Estimate" data={formattedData} dataKey="estimate" fill="#ff5722" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default EarningsSurpriseGraph;
