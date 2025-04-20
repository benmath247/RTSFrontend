import React, { useState, useEffect } from "react";
import useToggleFavoriteStock from "../../hooks/useToggleFavoriteStock";
import { FaRegStar, FaStar } from "react-icons/fa";

const FavoriteStar = ({ ticker, isFavorite }) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  useEffect(() => {
    setIsFavoriteState(isFavorite);
  }, [isFavorite]);

  const favoriteStock = useToggleFavoriteStock(
    isFavoriteState,
    setIsFavoriteState,
    ticker,
  );
  const handleClick = () => {
    favoriteStock();
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {isFavoriteState ? <FaStar color="gold" /> : <FaRegStar />}
    </div>
  );
};

export default FavoriteStar;
