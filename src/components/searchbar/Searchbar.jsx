
import './searchbar.css';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { useContext, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { DBContext } from '../../contexts/DBContext';
import { NavbarContext } from '../../contexts/NavbarContext';

const SearchBar = () => {

    const {searchProducts} = useContext(DBContext);
    const {showAutoComplete, setShowAutoComplete, suggestions, handleAutoComplete} = useContext(NavbarContext);

    const navigate = useNavigate();
    const searchRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
      document.addEventListener('click', handleOutsideClick, true);
    }, [])

    const handleOutsideClick = (e) => {
      if (searchRef.current != null)
        if (!searchRef.current.contains(e.target)) {
          setShowAutoComplete(false);
        }
    }

    return(
        <>
          <div className='searchBarContainer' ref={searchRef}>
             <div className={showAutoComplete ? "searchContainerAutoComplete" : "searchContainer"}>
                <input type='text' className='searchInput' onChange={handleAutoComplete} onKeyDown={handleAutoComplete} ref={inputRef}/>
                <div className='searchButton' onClick={() => {
                  setShowAutoComplete(false);
                  searchProducts(inputRef.current.value);
                  navigate('/');
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="searchIcon" width="25" height="25" 
                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </div>
              </div>
                <div className='searchResults'>
                { showAutoComplete ? 
                  <List sx={{ bgcolor: 'primary.main', outline: '2px solid white', padding: '0px 0px', borderRadius: '0 0 25px 25px'}}>
                    {
                      suggestions.map((item, i, arr) => (
                        <div key={item.id}>
                          <ListItem className='listItem' button sx={{ 
                            border: '5px solid transparent',
                            borderRadius: item == suggestions[suggestions.length - 1] ? '0 0 25px 25px' : null,
                            paddingRight: '0px', ':hover': { bgcolor: '#111', borderLeft: '5px solid #226e36' }}} 
                            onClick={() => {
                              searchProducts(item.title);
                              navigate(`/product/${item.id}`);
                              setShowAutoComplete(false);
                            }}
                          >
                            <ListItemText primary={item.title} sx={{ margin: '0 auto', color: 'white', padding: '5px'}} />
                            <ListItemIcon><SearchIcon sx={{ color: '#fff', marginLeft: '47%' }}/></ListItemIcon>
                          </ListItem>
                          { (arr.length - 1 === i) ? (
                            null
                          ) : ( <Divider variant='middle' sx={{ margin: '1px', bgcolor: 'secondary.main' }} />
                          )}
                        </div>
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