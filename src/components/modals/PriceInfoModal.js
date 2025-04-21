import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Spinner } from "react-bootstrap";
import useStockPrice from "../../hooks/useStockPrice";
import axios from "axios";

const PriceInfoModal = ({ show, onHide, stock }) => {
    const { stockPriceData, error, fetchStockData } = useStockPrice();
    const [logoData, setLogoData] = useState(null);
    const [isLoadingLogo, setIsLoadingLogo] = useState(false);

    useEffect(() => {
        if (show && stock) {
            fetchStockData(stock);
            fetchLogoData(stock);
        } else if (!show) {
            resetState();
        }
    }, [show, stock, fetchStockData]);

    const resetState = () => {
        setLogoData(null);
        setIsLoadingLogo(false);
    };

    const fetchLogoData = async (companyName) => {
        setIsLoadingLogo(true);
        try {
            const apiKey = "cP1TKlvcDX/LLMcD5hHjKw==E5SrJvJtMhSJ8sRm";
            const apiUrl = `https://api.api-ninjas.com/v1/logo?ticker=${companyName}`;
            const response = await axios.get(apiUrl, {
                headers: { "X-Api-Key": apiKey },
            });
            setLogoData(response.data[0]);
        } catch (error) {
            console.error("Error fetching logo:", error);
        } finally {
            setIsLoadingLogo(false);
        }
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString();
    };

    const renderLogo = () => {
        if (isLoadingLogo) return
        <div className="text-center my-4">
            <Spinner />
        </div>;

        if (logoData) {
            return (
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
            );
        }
        return null;
    };

    const renderTable = () => {
        const { c, h, l, o, pc } = stockPriceData;

        if (c === 0 && h === 0 && l === 0 && o === 0 && pc === 0) {
            return <p className="text-center text-muted">Prices are not available from <a href="https://www.finnhub.io">finnhub.io</a> for this stock.</p>;
        }

        return (
            <Table striped bordered hover className="mt-3">
                <tbody>
                    <tr>
                        <td><strong>Current Price</strong></td>
                        <td>{c}</td>
                    </tr>
                    <tr>
                        <td><strong>High Price</strong></td>
                        <td>{h}</td>
                    </tr>
                    <tr>
                        <td><strong>Low Price</strong></td>
                        <td>{l}</td>
                    </tr>
                    <tr>
                        <td><strong>Open Price</strong></td>
                        <td>{o}</td>
                    </tr>
                    <tr>
                        <td><strong>Previous Close</strong></td>
                        <td>{pc}</td>
                    </tr>
                    <tr>
                        <td><strong>Timestamp</strong></td>
                        <td>{formatTimestamp(stockPriceData.t)}</td>
                    </tr>
                </tbody>
            </Table>
        );
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-center w-100">Price Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : stockPriceData ? (
                    <>
                        {renderLogo()}
                        {renderTable()}
                    </>
                ) : (
                    <Spinner />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PriceInfoModal;
