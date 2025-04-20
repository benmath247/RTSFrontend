import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import StockDataCard from "./StockDataCard";
import useListFavoriteStock from "../../hooks/useListFavoriteStock";

const StockDataList = ({ data, currentPage, itemsPerPage, onPageChange }) => {
  const [favoriteStocks, setFavoriteStocks] = useState([]);
  const listFavoriteStocks = useListFavoriteStock();
  const fetchFavoriteStocks = async () => {
    const response = await listFavoriteStocks();
    setFavoriteStocks(response.results);
  };
  useEffect(() => {
    fetchFavoriteStocks();
  }, []);

  const sortedData = [...data].sort((a, b) => {
    const hasDotA = a.displaySymbol.includes(".");
    const hasDotB = b.displaySymbol.includes(".");
    return hasDotA - hasDotB;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  function isFavoriteStock(symbol) {
    return favoriteStocks.some((stock) => stock.stock_symbol === symbol);
  }
  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4">
        {paginatedData.map((item, index) => (
          <Col key={index}>
            <StockDataCard
              item={item}
              isFavorite={isFavoriteStock(item.displaySymbol)}
            />
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
