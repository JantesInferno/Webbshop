import { Card, CardContent, IconButton, Typography, Tooltip } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './productcard.css';
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product, addToCart }) => {

    const navigate = useNavigate();

    return(
        <>
            <Card elevation={5} sx={{ bgcolor: 'primary.main', color: 'secondary.main', border: '1px solid #111' }}>
            <div className="cardActionArea" onClick={() => navigate(`/Webbshop/product/${product.productId}`)}>
                    <div className="productImageContainer">
                            <img src={product.imageURL} className="productImage"/>
                    </div>
                    <Tooltip title={product.title}>
                        <div className='cardHeader'>
                            <Typography variant={'body1'} color={'primary'} textAlign={'left'} paddingX={'16px'} paddingTop={'16px'} sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                                color: 'secondary',
                                minHeight: '3em'
                                
                            }}>
                                {product.title}
                            </Typography>
                            </div>
                        </Tooltip>
                    <CardContent >
                        <Typography variant="body2" sx={{
                            height: '3em',
                            display: "flex",
                            overflow: "hidden", 
                            "& .MuiCardHeader-content": {
                                overflow: "hidden"
                            }
                            }} textAlign="left">
                            {product.subtitle}
                        </Typography>
                        <Typography variant={'h6'} color={'#71bf7b'} textAlign={'center'} paddingX={'16px'} paddingTop={'16px'}>{product.price} kr</Typography>
                    </CardContent>
                    </div> 
                    <IconButton sx={{ position: 'inherit', borderRadius: '0', width: '100%', gap: '5px', bgcolor: 'action.main', ':hover': {bgcolor: '#123d1e' }}} 
                        onClick={() => addToCart(product)}>

                        {/* OM KUND KÖPT MER ÄN QUANTITY -> ÄNDRA KNAPPEN TILL "SLUT I LAGER" */}

                        <ShoppingCartIcon className='shoppingCartIcon' color='secondary' fontSize='small' sx={{ p: 0}}/>
                        <Typography color='secondary'>Köp</Typography>
                    </IconButton>
            </Card>
        </>
    )
}

export default ProductCard;