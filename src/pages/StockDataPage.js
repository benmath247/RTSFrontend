import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import useStockData from '../hooks/useStockData';
import StockDataList from '../components/stockData/StockDataList';
import PriceInfoModal from '../components/modals/PriceInfoModal';

const StockData = () => {
    const [ticker, setTicker] = useState('');
    const { stockData, error, fetchStockData, setError } = useStockData();
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); 
    const itemsPerPage = 6;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        fetchStockData(ticker).finally(() => setLoading(false));
        setCurrentPage(1);
    };

    const handleModalToggle = () => setShowModal(!showModal);

    return (
        <Container className="" style={{ backgroundColor: '#f8f9fa', height: '100vh', padding: '50px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center">Stock Data</h1>
            </div>
            <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group className="mb-3" controlId="tickerInput">
                    <Form.Label>Ticker:</Form.Label>
                    <Form.Control
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        placeholder="Enter ticker symbol"
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Loading...
                        </>
                    ) : (
                        'Get Stock Data'
                    )}
                </Button>
            </Form>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            {stockData?.result && (
                <StockDataList
                    data={stockData.result}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
            <PriceInfoModal show={showModal} onHide={handleModalToggle} />
        </Container>
    );
};

export default StockData;
