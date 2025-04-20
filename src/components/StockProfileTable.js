import React from "react";
import { Table, Card, Image } from "react-bootstrap";

const StockProfileTable = ({ stockProfileData }) => {
    if (!stockProfileData) {
        return <p>Loading stock profile data...</p>;
    }

    // Ensure stockProfileData is an array and take the first item
    const profile = Array.isArray(stockProfileData)
        ? stockProfileData[0]
        : stockProfileData;

    if (!profile) {
        return <p>No stock profile data available.</p>;
    }

    const {
        name,
        ticker: stockTicker,
        description,
        marketCapitalization,
        employeeTotal,
        exchange,
        industry = profile.finnhubIndustry,
        weburl,
        logo,
    } = profile;

    return (
        <Card className="m-3 p-3">
            <Card.Body>
                <Card.Title>
                    {name} ({stockTicker})
                </Card.Title>
                <Image src={logo} alt={`${name} logo`} height="50" className="mb-3" />
                <Card.Text>{description}</Card.Text>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <th>Exchange</th>
                                <td>{exchange}</td>
                            </tr>
                            <tr>
                                <th>Industry</th>
                                <td>{industry}</td>
                            </tr>
                            <tr>
                                <th>Market Cap</th>
                                <td>
                                    {marketCapitalization !== undefined
                                        ? `$${marketCapitalization.toLocaleString()}M`
                                        : "N/A"}
                                </td>
                            </tr>
                            <tr>
                                <th>Employees</th>
                                <td>{employeeTotal || "N/A"}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>
                                    <a href={weburl} target="_blank" rel="noopener noreferrer">
                                        {weburl}
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default StockProfileTable;
