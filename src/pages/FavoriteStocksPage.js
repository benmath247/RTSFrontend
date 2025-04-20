import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useListFavoriteStock from "../hooks/useListFavoriteStock";
import StockProfileTable from "../components/StockProfileTable";
import fetchStockProfile from "../hooks/useStockProfile"; // Renamed for clarity

function FavoriteStockItem({ stock, eventKey }) {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStockProfile(stock.stock_symbol); // Use renamed function
      setItemData(data); // Set the fetched data to state
    };
    fetchData();
  }, [stock.stock_symbol]);

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{stock.stock_symbol}</Accordion.Header>
      <Accordion.Body>
        <StockProfileTable stockProfileData={itemData || {}} />
      </Accordion.Body>
    </Accordion.Item>
  );
}

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

  return (
    <div className="container mt-4">
      <h1>Favorite Stocks</h1>
      {stocks.length > 0 ? (
        <Accordion>
          {stocks.map((stock, index) => (
            <FavoriteStockItem
              stock={stock}
              eventKey={index.toString()}
              key={index}
            />
          ))}
        </Accordion>
      ) : (
        <p>No favorite stocks found.</p>
      )}
    </div>
  );
}

export default FavoriteStocksPage;
