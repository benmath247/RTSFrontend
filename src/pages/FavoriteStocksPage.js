import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useListFavoriteStock from "../hooks/useListFavoriteStock";
import StockProfileTable from "../components/StockProfileTable";
import fetchStockProfile from "../hooks/useStockProfile"; // Renamed for clarity
import StockNewsAccordion from "../components/StockNewsAccordion"; // Ensure this is a default import
import StockBarGraph from "../components/StockBarGraph"; // Import the new component
import useRecommendationTrends from "../hooks/useRecommendationTrends"; // Import the new hook

function FavoriteStockItem({ stock, eventKey }) {
  const [itemData, setItemData] = useState(null);
  const { recommendationData, loading, error } = useRecommendationTrends(stock.stock_symbol);

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
        <div className="d-flex flex-column flex-lg-row justify-content-between">
          <div className="flex-grow-1 me-lg-3">
            <StockProfileTable stockProfileData={itemData || {}} />
            <div className="mt-4">
              <h3>Recommendation Trends</h3>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <StockBarGraph data={recommendationData} />
              )}
            </div>
          </div>
          <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: "0" }}>
            <h3>News About {stock.stock_symbol}</h3>
            <div className="flex-grow-1 overflow-auto">
              <StockNewsAccordion symbol={stock.stock_symbol} />
            </div>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

function FavoriteStocksPage() {
  const [stocks, setStocks] = useState([]);
  const listFavoriteStocks = useListFavoriteStock();

  const fetchFavoriteStocks = async () => {
    const response = await listFavoriteStocks();
    if (response && response.results) {
      setStocks(response.results);
    } else {
      setStocks([]);
    }
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
        <p>No favorite stocks found. Add more stocks <a href="stock-data">here</a></p>
      )}
    </div>
  );
}

export default FavoriteStocksPage;
