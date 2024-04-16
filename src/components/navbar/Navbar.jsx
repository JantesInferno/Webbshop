import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Divider, Drawer, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchBar from '../searchbar/Searchbar';
import { MenuItem } from '@mui/material';
import { Typography } from '@mui/material';
import './navbar.css';
import logo from '../../assets/eynet_logo.png';
import { useContext, useEffect, useState } from 'react';
import Login from '../login/Login';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { NavbarContext } from '../../contexts/NavbarContext';
import { DBContext } from '../../contexts/DBContext';
import { AuthContext } from '../../contexts/AuthContext';

import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {

    const {cart, setCart, addItemToQuantity, removeFromCart, removeItemFromQuantity} = useContext(CartContext);
    const {anchorCart, handleOpenCartMenu, handleCloseCartMenu, handleOpenLoginMenu} = useContext(NavbarContext);
    const {createOrder, searchProducts, getAllProducts, handleDrawerToggle} = useContext(DBContext);
    const {signOutUser, currentUser} = useContext(AuthContext);

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let n = cart.reduce((n, {quantity}) => n + quantity, 0);
        setNumOfCartItems(n);
    }, [cart])

    useEffect(() => {
        if (currentUser != null) {
            setError(false);
        }
        else {
            setError(true);
        }
    }, [currentUser])

    const handleOrder = async () => {
        if (currentUser != null) {
            const result = await createOrder(cart);

            if (result == 401) {
                signOutUser();
                alert('Din användarsession har löpt ut. Vänligen logga in igen för att lägga en beställning');
            }
            else if (result == 500) {
                alert('Ett oväntat fel har inträffat. Vänligen försök igen senare');
            }
            else {
                alert('Beställning lagd');
                setCart([]);
            }
        }
    }

    const handleCartClick = (product) => {
        searchProducts(product.title);
        navigate(`/product/${product.id}`);
    }

    return(
        <>
            <div className='navbarContainer'>
                
                <Link to='/' >
                <img src={logo} className='logo' onClick={getAllProducts} />
                </Link>

                { window.matchMedia("(min-width: 768px)").matches ? (
                    <SearchBar />
                 ) 
                 : 
                 ( null
                )}
                    
                    <div className='icons'>
                        <Tooltip title="Öppna varukorgen">
                            <Badge badgeContent={numOfCartItems} sx={{
                                "& .MuiBadge-badge": {
                                color: "#fff",
                                backgroundColor: "action.main"
                                }
                            }}>
                                <ShoppingCartIcon className='shoppingCartIcon' color='secondary' fontSize='large' onClick={handleOpenCartMenu}/>
                            </Badge>
                        </Tooltip>

                        {currentUser != null && currentUser.name != null ? (
                            <>
                            <Tooltip title={currentUser.displayName}>
                                <Avatar sx={{ bgcolor: 'action.main', padding: '5px', height: '40px', width: '40px'}}>
                                    {currentUser.name.split(/\W+/).length === 2 ? `${currentUser.name.split(' ')[0][0]}${currentUser.name.split(' ')[1][0]}` : `${currentUser.name.split(' ')[0][0]}`}
                                </Avatar>
                            </Tooltip>
                            <Tooltip title="Logga ut">
                                <LogoutIcon className='logOutIcon' onClick={signOutUser} />
                            </Tooltip>
                            </>
                        ) : (
                            <>
                            
                            <Tooltip title="Logga in">
                                <LoginIcon sx={{ marginRight: '8px',width: '40px', height: '40px', padding: '5px', borderRadius: '50%', ':hover': { bgcolor: 'action.main'}}} onClick={handleOpenLoginMenu} />
                            </Tooltip>
                            </>
                        )}
                    </div>
                    
                    <Drawer 
                    anchor='right'
                    className="menuAppbar"
                    keepMounted
                    open={Boolean(anchorCart)}
                    onClose={handleCloseCartMenu}
                    PaperProps={{
                        sx: {
                            width: window.matchMedia("(min-width: 900px)").matches ? 400 : 'calc(100vw - 16px)',
                            height: 'auto',
                            top: 108,
                            marginRight: window.matchMedia("(min-width: 900px)").matches ? '25px' : '8px',
                            bgcolor: 'primary.main'
                        }
                    }}
                    >
                        <h2 style={{textAlign: 'center', color: 'white'}}>Min varukorg</h2>
                        <div className='cartColumnHeaders'>
                            <h5>Produkt</h5>
                            <div className='count-price'>
                                <h5>Antal</h5>
                                <h5>Pris</h5>
                            </div>
                        </div>
                        <Divider color='white'/>

                        {cart.map((product) => 
                            (
                                <div className='row' key={product.productId}>
                                    <MenuItem sx={{minWidth: '45%', width: '45%', bgcolor: 'primary.main', color: 'secondary.main', border: '2px solid transparent', ':hover': { bgcolor: '#111', borderLeft: '2px solid #226e36'}}} onClick={() => handleCartClick(product)}>
                                    <Typography noWrap textAlign="left">{product.title}</Typography>
                                    </MenuItem>
                                    <div className='count'>
                                        <RemoveIcon sx={{cursor: 'pointer', color: 'secondary.main', borderRadius: '50%', padding: '2px', ':hover': {bgcolor: '#111'} }} fontSize='small' onClick={() => removeItemFromQuantity(product)} />
                                        <Typography textAlign="center" sx={{ color: 'secondary.main' }}>{product.quantity}</Typography>
                                        <AddIcon sx={{cursor: 'pointer', color: 'secondary.main', borderRadius: '50%', padding: '2px', ':hover': {bgcolor: '#111'} }} fontSize='small' onClick={() => addItemToQuantity(product)} />
                                    </div>
                                    <div className='price-delete'>
                                        <Typography className='price' textAlign="right" sx={{marginLeft: '25px', width: '70px', color: 'secondary.main' }}>{product.price.toLocaleString().replace(',', ' ')} kr</Typography>
                                        <DeleteIcon sx={{cursor: 'pointer', color: 'secondary.main', borderRadius: '50%', padding: '2px', ':hover': {bgcolor: '#111'} }} fontSize='small' onClick={() => removeFromCart(product)}/>
                                    </div>
                                </div>
                            )
                        )}
                        
                        <Divider color='white'/>
                        <div className='cartColumnFooters'>
                                <h4>Summa: </h4>
                                <h4>{cart.reduce((n, {price, quantity}) => n + (price * quantity), 0).toLocaleString().replace(',', ' ')} kr</h4>
                        </div>

                        {error ? (
                            <h4 style={{position: 'relative', margin: '0 auto', bottom: '50px',color: '#ad443d', padding: '0'}}>Logga in för att lägga en order</h4>
                        ) : null }
                        <Button sx={{bottom: 0, width: '100%', position: 'absolute', color: 'secondary.main', bgcolor: 'action.main', ':hover': { bgcolor: '#123d1e' }}}
                        onClick={handleOrder}
                        >
                            Lägg beställning
                        </Button>
                        
                    </Drawer>

                    <Login />

                    
            </div>
            { window.matchMedia("(max-width: 767px)").matches ? (

                <div style={{
                    display: 'block',
                    width: '100%',
                    backgroundColor: '#111',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex'}}>
                        <IconButton
                        display="flex"
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ ml: 1, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                            <SearchBar />
                        </div>
                </div>
                ) 
                : 
                ( null
            )}
        </>
    )
}

export default Navbar;