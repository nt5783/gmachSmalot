import React, { useContext } from 'react';
import { UserContext, FavoritesContext } from '../App';



const Favorites = () => {

    const { user } = useContext(UserContext);
    const { favorites, setFavorites } = useContext(FavoritesContext);
    return (<div className='cart-container'>
        {user && (favorites.length > 0 ? favorites.map((f) =>
            <div>{f}</div>
        ) : <h3>You have no favorites yet</h3>)}
    </div>)
}

export default Favorites