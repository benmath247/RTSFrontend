import React, { useState, useEffect } from "react";
import useListFavoriteStock from "../hooks/useListFavoriteStock";

function FavoriteStocksPage() {
  const [stocks, setStocks] = useState([]);
  const listFavoriteStocks = useListFavoriteStock();

  const fetchFavoriteStocks = async () => {
    const response = await listFavoriteStocks();
    setStocks(response.results);
  };

  useEffect(() => {
    fetchFavoriteStocks();
  }, []);
  console.log(stocks)
  return (
    <div className="container mt-4">
      <h1>Favorite Stocks</h1>
      {stocks.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Symbol</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.stock_symbol}</td>
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

export default FavoriteStocksPage;
