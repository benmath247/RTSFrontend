import React from 'react';

function FavoriteStocksPage({ favoriteStocks }) {
    return (
        <div className="container mt-4">
            <h1>Favorite Stocks</h1>
            {favoriteStocks.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favoriteStocks.map((stock, index) => (
                            <tr key={index}>
                                <td>{stock.symbol}</td>
                                <td>{stock.name}</td>
                                <td>${stock.price.toFixed(2)}</td>
                                <td>{stock.change.toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No favorite stocks found.</p>
            )}

        </div>
    );
}

FavoriteStocksPage.defaultProps = {
    favoriteStocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 150, change: 1.2, marketCap: '2.5T' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800, change: -0.5, marketCap: '1.8T' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3400, change: 0.8, marketCap: '1.7T' },
    ],
};

export default FavoriteStocksPage;