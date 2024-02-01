
import './searchbar.css';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { useContext, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { DBContext } from '../../contexts/DBContext';
import { NavbarContext } from '../../contexts/NavbarContext';

const SearchBar = () => {

    const {productsAutocomplete, searchProducts, data} = useContext(DBContext);
    const {showAutoComplete, setShowAutoComplete, suggestions, setSuggestions, handleAutoComplete} = useContext(NavbarContext);

    const navigate = useNavigate();
    const searchRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
      document.addEventListener('click', handleOutsideClick, true);
    }, [])

    const handleOutsideClick = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setShowAutoComplete(false);
      }
    }

    return(
        <>
          <div className='searchAutoCompleteContainer' ref={searchRef}>
             <div className={showAutoComplete ? "searchContainerAutoComplete" : "searchContainer"}>
                <input type='text' className='searchInput' onChange={handleAutoComplete} onKeyDown={handleAutoComplete} ref={inputRef}/>
                <div className='searchButton' onClick={() => {
                  setShowAutoComplete(false);
                  searchProducts(inputRef.current.value);
                  navigate('/');
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="searchIcon" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </div>
              </div>
                <div className='searchResults'>
                { showAutoComplete ? 
                  <List sx={{ bgcolor: 'primary.main', outline: '2px solid white', padding: '0px 0px', borderRadius: '0 0 0 0'}}>
                    {
                      suggestions.map((item) => (
                        <>
                          <ListItem key={item.id} className='listItem' button sx={{ border: '5px solid transparent', paddingRight: '0px', ':hover': { bgcolor: '#111', borderLeft: '5px solid #226e36' }}} onClick={() => {
                            setShowAutoComplete(false);
                            searchProducts(item.title);
                            navigate('/');
                            }}>
                            <ListItemText primary={item.title} sx={{ margin: '0 auto', color: 'white', padding: '5px'}} />
                            <ListItemIcon><SearchIcon sx={{ color: '#fff', marginLeft: '23px' }}/></ListItemIcon>
                          </ListItem>
                          <Divider variant='middle' sx={{ margin: '1px', bgcolor: 'secondary.main' }} />
                        </>
                      ))
                    }
                  </List>
                  : null
                }
                </div>
          </div>
        </>
    )
}

export default SearchBar;