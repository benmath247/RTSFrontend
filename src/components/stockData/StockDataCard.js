import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import PriceInfoModal from "../modals/PriceInfoModal";
import FavoriteStar from "./FavoriteStar";

const StockDataCard = ({ item, isFavorite }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => setShowModal(!showModal);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{item.displaySymbol}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{item.type}</Card.Subtitle>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          {!item.displaySymbol.includes(".") ? (
            <>
              <Button onClick={handleModalToggle}>Get Price Information</Button>
            </>
          ) : (
            <div className="text-muted">Price info not available</div>
          )}
          <FavoriteStar ticker={item.displaySymbol} isFavorite={isFavorite} />
        </Card.Footer>
      </Card>
      <PriceInfoModal
        show={showModal}
        onHide={handleModalToggle}
        stock={item.displaySymbol}
      />
    </>
  );
};

export default StockDataCard;
