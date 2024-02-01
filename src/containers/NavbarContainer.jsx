import { useState, useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import { AppContext } from "../contexts/AppContext";

/*
const NavbarContainer = () => {

    const {cart, removeFromCart, addToCart, removeItemFromQuantity, data, productsAutocomplete, searchProducts, signOutUser, signInUser, createOrder, currentUser} = useContext(AppContext);
    const [anchorCart, setAnchorCart] = useState(null);
    const [anchorLogin, setAnchorLogin] = useState(null);


    const handleOpenCartMenu = (event) => {
        setAnchorCart(event.currentTarget);
    };

    const handleCloseCartMenu = () => {
        setAnchorCart(null);
    };

    const handleOpenLoginMenu = (event) => {
        setAnchorLogin(event.currentTarget);
    };

    const handleCloseLoginMenu = () => {
        setAnchorLogin(null);
    };

    return(
        <>
            <AppContext.Provider value={{ 
                data,
                productsAutocomplete,
                cart, 
                removeFromCart, addToCart,
                removeItemFromQuantity,
                anchorCart, 
                handleOpenCartMenu, 
                handleCloseCartMenu,
                anchorLogin,
                handleOpenLoginMenu,
                handleCloseLoginMenu,
                signOutUser, signInUser,
                currentUser, createOrder,
                searchProducts
            }}>
                <Navbar />
            </AppContext.Provider>
        </>
    )
}

export default NavbarContainer;*/