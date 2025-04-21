import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import useStockPrice from "../../hooks/useStockPrice";
import axios from "axios";

const PriceInfoModal = ({ show, onHide, stock }) => {
    const { stockPriceData, error, fetchStockData } = useStockPrice();
    const [logoData, setLogoData] = useState(null);

    useEffect(() => {
        if (show && stock) {
            fetchStockData(stock);
            fetchLogoData(stock);
        } else if (!show) {
            setLogoData(null);
        }
    }, [show, stock, fetchStockData]);

    const fetchLogoData = (companyName) => {
        const apiKey = "cP1TKlvcDX/LLMcD5hHjKw==E5SrJvJtMhSJ8sRm";
        const apiUrl = `https://api.api-ninjas.com/v1/logo?ticker=${companyName}`;

        axios
            .get(apiUrl, {
                headers: {
                    "X-Api-Key": apiKey,
                },
            })
            .then((response) => {
                setLogoData(response.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching logo:", error);
            });
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-center w-100">
                    Price Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : stockPriceData ? (
                    <>
                        {logoData && (
                            <div className="text-center my-4">
                                <img
                                    src={logoData.image}
                                    alt={`${logoData.name} Logo`}
                                    className="img-fluid rounded"
                                    style={{
                                        maxWidth: "150px",
                                        border: "1px solid #ddd",
                                        padding: "10px",
                                        backgroundColor: "#f9f9f9",
                                    }}
                                />
                            </div>
                        )}
                        <Table striped bordered hover className="mt-3">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Current Price</strong>
                                    </td>
                                    <td>{stockPriceData.c}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>High Price</strong>
                                    </td>
                                    <td>{stockPriceData.h}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Low Price</strong>
                                    </td>
                                    <td>{stockPriceData.l}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Open Price</strong>
                                    </td>
                                    <td>{stockPriceData.o}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Previous Close</strong>
                                    </td>
                                    <td>{stockPriceData.pc}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Timestamp</strong>
                                    </td>
                                    <td>{formatTimestamp(stockPriceData.t)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <p className="text-center"></p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PriceInfoModal;
