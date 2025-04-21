import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Pagination from 'react-bootstrap/Pagination'; // Import Pagination component
import NewsCard from './NewsCard';
import useCompanyNews from '../hooks/useCompanyNews'; // Import the custom hook

const StockNewsAccordion = ({ symbol }) => {
    const { newsData, loading, error } = useCompanyNews(symbol); // Always call the hook
    const [activeSource, setActiveSource] = useState('All'); // State to track active source tab
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const itemsPerPage = 9; // Number of articles per page (3 rows of 3 articles)

    if (loading) return <p>Loading news...</p>;
    if (error) return <p>Error: {error}</p>;

    // Extract unique sources from newsData and sort them alphabetically
    const sources = ['All', ...new Set(newsData.map((newsItem) => newsItem.source))].sort();

    // Filter news based on active source
    const filteredNews = activeSource === 'All'
        ? newsData
        : newsData.filter((newsItem) => newsItem.source === activeSource);

    // Sort logic
    const sortedFilteredItems = activeSource === 'All'
        ? filteredNews.sort((a, b) => {
            if (a.image && !b.image) return -1;
            if (!a.image && b.image) return 1;
            if (a.source < b.source) return -1;
            if (a.source > b.source) return 1;
            return 0;
        })
        : filteredNews.sort((a, b) => {
            if (a.image && !b.image) return -1;
            if (!a.image && b.image) return 1;
            return 0;
        });

    // Calculate pagination details
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedFilteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedFilteredItems.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Tabs
                id="news-source-tabs"
                activeKey={activeSource}
                onSelect={(k) => {
                    setActiveSource(k);
                    setCurrentPage(1); // Reset to first page when changing source
                }}
                className="mb-3"
            >
                {sources.map((source) => (
                    <Tab eventKey={source} title={source} key={source}>
                        <Row className="mt-3">
                            {currentItems.map((newsItem) => (
                                <Col key={newsItem.id} xs={12} sm={6} md={4}>
                                    <NewsCard
                                        newsItem={newsItem}
                                        onError={(e) => e.target.style.display = 'none'} // Hide image if it fails to load
                                    />
                                </Col>
                            ))}
                        </Row>
                        <Pagination className="mt-3">
                            {[...Array(totalPages).keys()].map((page) => (
                                <Pagination.Item
                                    key={page + 1}
                                    active={page + 1 === currentPage}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    {page + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </Tab>
                ))}
            </Tabs>
        </div >
    );
};

export default StockNewsAccordion;
