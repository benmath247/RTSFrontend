import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import PriceInfoModal from "../modals/PriceInfoModal";

const StockDataCard = ({ item }) => {
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
        <Card.Footer>
          {!item.displaySymbol.includes(".") ? (
            <>
              <Button onClick={handleModalToggle}>Get Price Information</Button>
            </>
          ) : (
            <div className="text-muted">Price info not available</div>
          )}
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
