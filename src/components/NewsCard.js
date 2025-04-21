import React from 'react';
import Card from 'react-bootstrap/Card';

const NewsCard = ({ newsItem }) => {
    return (
        <Card>
            <Card.Body>
                {newsItem.image && (
                    <img
                        src={newsItem.image}
                        alt={newsItem.headline}
                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                    />
                )}
                <p>{newsItem.summary}</p>
                <p>
                    {new Date(newsItem.datetime * 1000).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    }).replace(' at ', ' | ')}
                </p>
                <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                    Read more
                </a>
            </Card.Body>
        </Card>
    );
};

export default NewsCard;
