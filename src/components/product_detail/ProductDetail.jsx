import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { DBContext } from "../../contexts/DBContext";
import { useContext, useEffect} from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './productdetail.css';

const ProductDetail = () => {

    const {productId} = useParams();
    const {data} = useContext(DBContext);
    const {addToCart} = useContext(CartContext);

    const navigate = useNavigate();

    let product = data.find((d) => d.productId == productId);

    return(
        <>
            <Card elevation={5} sx={{ bgcolor: 'primary.main', color: 'secondary.main', border: '1px solid #111', width: { xs: 'calc(100% - 16px)', sm: '50%'}, margin: 'auto auto' }}>
                    <div className="productDetailImageContainer">
                            <img src={product ? product.imageURL : null} className="productDetailImage"/>
                    </div>
                        <div className='cardHeader'>
                            <Typography variant={'h4'} color={'primary'} textAlign={'center'} paddingX={'16px'} paddingTop={'16px'} sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                                color: 'secondary'
                                
                            }}>
                                {product ? product.title : null}
                            </Typography>
                            </div>
                    <CardContent >
                        <Typography variant="h6" textAlign={'center'} sx={{
                            height: '3em',
                            }}>
                            {product ? product.subtitle : null}
                        </Typography>
                        <Typography variant="body1" textAlign={'left'} sx={{
                            marginBottom: '5em'
                            }}>
                            {product ? product.description : null}
                        </Typography>
                        <Typography variant={'h6'} color={'#71bf7b'} textAlign={'center'} paddingX={'16px'} paddingTop={'16px'}>{product ? product.price : null} kr</Typography>
                    </CardContent>
                    <IconButton sx={{borderRadius: '0', width: '100%', gap: '5px', bgcolor: 'action.main', ':hover': {bgcolor: '#123d1e' }}} 
                        onClick={() => addToCart(product)}>

                        {/* OM KUND KÖPT MER ÄN QUANTITY -> ÄNDRA KNAPPEN TILL "SLUT I LAGER" */}

                        <ShoppingCartIcon className='shoppingCartIcon' color='secondary' fontSize='small' sx={{ p: 0}}/>
                        <Typography color='secondary'>Köp</Typography>
                    </IconButton>
            </Card>
        </>
    )
}

export default ProductDetail;