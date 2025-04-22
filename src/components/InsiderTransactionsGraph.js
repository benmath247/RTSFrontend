import React from "react";
import { Table } from "react-bootstrap";

function InsiderTransactionsGraph({ data }) {
    return (
        <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <Table striped bordered hover>
                <thead className="sticky-top bg-white">
                    <tr>
                        <th>Name</th>
                        <th>Transaction Date</th>
                        <th>Transaction Code</th>
                        <th>Change</th>
                        <th>Shares Held</th>
                        <th>Transaction Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.name}</td>
                            <td>{transaction.transactionDate}</td>
                            <td>{transaction.transactionCode}</td>
                            <td>{transaction.change}</td>
                            <td>{transaction.share}</td>
                            <td>{transaction.transactionPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default InsiderTransactionsGraph;
