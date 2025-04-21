import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import NewsCard from './NewsCard';
import useCompanyNews from '../hooks/useCompanyNews'; // Import the custom hook

const StockNewsAccordion = ({ symbol }) => {
    const { newsData, loading, error } = useCompanyNews(symbol); // Always call the hook
    const [activeSource, setActiveSource] = useState('All'); // State to track active source tab

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

    return (
        <div>
            <Tabs
                id="news-source-tabs"
                activeKey={activeSource}
                onSelect={(k) => setActiveSource(k)}
                className="mb-3"
            >
                {sources.map((source) => (
                    <Tab eventKey={source} title={source} key={source}>
                        <Row className="g-4 mt-3">
                            {sortedFilteredItems.map((newsItem) => (
                                <Col key={newsItem.id} xs={12} sm={6} md={4} lg={3}>
                                    <NewsCard
                                        newsItem={newsItem}
                                        onError={(e) => e.target.style.display = 'none'} // Hide image if it fails to load
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                ))}
            </Tabs>
        </div >
    );
};

export default StockNewsAccordion;
