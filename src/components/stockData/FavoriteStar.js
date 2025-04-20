import React, { useState } from 'react';
import useToggleFavoriteStock from '../../hooks/useToggleFavoriteStock';
import { FaRegStar, FaStar } from 'react-icons/fa'; // Using react-icons for star icons
const FavoriteStar = ({ ticker, isFavorite }) => {
    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite); // Local state to manage favorite status
    const favoriteStock = useToggleFavoriteStock(isFavoriteState, setIsFavoriteState, ticker);

    const handleClick = () => {
        favoriteStock()

    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            {isFavoriteState ? <FaStar color="gold" /> : <FaRegStar />}
        </div>
    );
};

export default FavoriteStar;
