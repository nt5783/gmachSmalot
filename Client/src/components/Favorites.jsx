import React, { useContext } from 'react';
import { UserContext, FavoritesContext } from '../App';
import { useNavigate } from 'react-router-dom';



const Favorites = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { favorites } = useContext(FavoritesContext);
    return (<div className='cart-container'>
        {user && (favorites.length > 0 ?
            <>
                <h2>Your Favorites</h2>
                <div className="cart-items">
                    {favorites.map((favorite, index) => (
                        <div key={index} className="cart-item">
                            <img src={favorite.image} alt="gown" className="gown-image" onClick={() =>
                                navigate(`../models/${favorite.model}`)} />
                            <div className="gown-details">
                                <span className="gown-model">Model: {favorite.model}</span>
                                <span className="gown-info">Color: {favorite.color}</span>
                                <span className="gown-info">Season: {favorite.season}</span>
                                <span className="gown-info">Length: {favorite.length}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </> : <h3>You have no favorites yet</h3>
        )}
    </div>)
}

export default Favorites