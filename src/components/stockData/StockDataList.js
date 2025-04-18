import React from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import StockDataCard from './StockDataCard';

const StockDataList = ({ data, currentPage, itemsPerPage, onPageChange }) => {
    const sortedData = [...data].sort((a, b) => {
        const hasDotA = a.displaySymbol.includes('.');
        const hasDotB = b.displaySymbol.includes('.');
        return hasDotA - hasDotB;
    });

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <Row xs={1} md={2} lg={3} className="g-4">
                {paginatedData.map((item, index) => (
                    <Col key={index}>
                        <StockDataCard item={item} />
                    </Col>
                ))}
            </Row>
            <Pagination className="justify-content-center mt-4">
                {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                        key={page + 1}
                        active={page + 1 === currentPage}
                        onClick={() => onPageChange(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};

export default StockDataList;
