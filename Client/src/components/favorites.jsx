import React, { useContext } from 'react';
import { UserContext, FavoritesContext } from '../App';



const Favorites = () => {

const {user} = useContext(UserContext);
const { favorites, setFavorites} = useContext(FavoritesContext);
    return (<>
        {user && favorites.map((f) => 
            <div>{f}</div>
        )}
    </>)
}

export default Favorites