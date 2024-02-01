import { useState, useContext, createContext, useRef } from "react";
import SearchBar from "../components/searchbar/Searchbar";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../contexts/NavbarContext";

/*
export const SearchContext = createContext();

const SearchbarContainer = () => {

    const {productsAutocomplete, searchProducts, data} = useContext(AppContext);
    const {showAutoComplete, setShowAutoComplete, suggestions, setSuggestions, handleAutoComplete} = useContext(NavbarContext);

    return(
        <>
            <AppContext.Provider value={{ 
                data,
                suggestions,
                showAutoComplete, setShowAutoComplete,
                handleAutoComplete,
                searchProducts
            }}>
                <SearchBar />
            </AppContext.Provider>
        </>
    )
}

export default SearchbarContainer;*/