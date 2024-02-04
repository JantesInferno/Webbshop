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
import logo from '../../assets/topstyles_logo.png';
import { useContext, useEffect, useState } from 'react';
import Login from '../login/Login';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { NavbarContext } from '../../contexts/NavbarContext';
import { DBContext } from '../../contexts/DBContext';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {

    const {cart, addItemToQuantity, removeFromCart, removeItemFromQuantity} = useContext(CartContext);
    const {anchorCart, handleOpenCartMenu, handleCloseCartMenu, handleOpenLoginMenu} = useContext(NavbarContext);
    const {createOrder, searchProducts, getAllProducts} = useContext(DBContext);
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

    const handleOrder = () => {
        if (currentUser != null) {
            createOrder(cart, currentUser);
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

                <SearchBar />
                    
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

                        {currentUser != null && currentUser.displayName != null ? (
                            <>
                            <Tooltip title={currentUser.displayName}>
                                <Avatar sx={{ bgcolor: 'action.main', padding: '5px', height: '40px', width: '40px'}}>
                                    {`${currentUser.displayName.split(' ')[0][0]}${currentUser.displayName.split(' ')[1][0]}`}
                                </Avatar>
                            </Tooltip>
                            <Tooltip title="Logga ut">
                                <LogoutIcon className='logOutIcon' onClick={signOutUser} />
                            </Tooltip>
                            </>
                        ) : (
                            <Button className='loginIcon' variant="contained" sx={{ textTransform: 'none', color: 'primary.main', bgcolor: 'secondary.main', border: 'none', transition: '0.3s', ':hover': { bgcolor: 'action.main', color: 'secondary.main'} }} endIcon={<LoginIcon  />} onClick={handleOpenLoginMenu}>
                                <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>Logga in</Typography>
                            </Button>
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
                            width: 400,
                            height: 'auto',
                            top: 108,
                            marginRight: '25px',
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
                                <div className='row' key={product.id}>
                                    <MenuItem sx={{minWidth: '45%', width: '45%', bgcolor: 'primary.main', color: 'secondary.main', border: '2px solid transparent', ':hover': { bgcolor: '#111', borderLeft: '2px solid #226e36'}}} key={product.id} onClick={() => handleCartClick(product)}>
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
                        Till kassan
                    </Button>
                    </Drawer>

                    <Login />
            </div>
        </>
    )
}

export default Navbar;