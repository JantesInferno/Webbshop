import { createContext, useContext, useState } from 'react';
import { DBContext } from './DBContext';
import { useNavigate } from 'react-router-dom';

export const NavbarContext = createContext();

export const NavbarContextProvider = ({children}) => {
    
    const {productsAutocomplete, searchProducts} = useContext(DBContext);

    const [anchorCart, setAnchorCart] = useState(null);
    const [anchorLogin, setAnchorLogin] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showAutoComplete, setShowAutoComplete] = useState(false);

    const navigate = useNavigate();


    const handleAutoComplete = (e) => {
        setShowAutoComplete(false);
        if (e.keyCode === 13) {
            searchProducts(e.target.value);
            navigate('/');
        }
        else if (productsAutocomplete.length > 0) {
            let searchSuggestions = productsAutocomplete.filter(d => {
                if (d.title.toLowerCase().startsWith(e.target.value.toLowerCase())) {
                    setShowAutoComplete(true);
                    return {title: d.title, id: d.id};
                }
            })
            if (e.target.value.length > 0) {
                setSuggestions(searchSuggestions);
            }
            else {
                setSuggestions([]);
                setShowAutoComplete(false);
            }
        }
    }

    const handleOpenCartMenu = (e) => {
        setAnchorCart(e.currentTarget);
    };

    const handleCloseCartMenu = () => {
        setAnchorCart(null);
    };

    const handleOpenLoginMenu = (e) => {
        setAnchorLogin(e.currentTarget);
    };

    const handleCloseLoginMenu = () => {
        setAnchorLogin(null);
    };

  
    return (
        <NavbarContext.Provider value={{ 
            anchorCart, setAnchorCart,
            anchorLogin, setAnchorLogin,
            suggestions, setSuggestions,
            showAutoComplete, setShowAutoComplete,
            handleAutoComplete,
            handleOpenCartMenu, handleCloseCartMenu,
            handleOpenLoginMenu, handleCloseLoginMenu,
        }}>
            {children}
        </NavbarContext.Provider>
    )
  }