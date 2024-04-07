import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import ProductCard from "../product_card/ProductCard";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useParams } from "react-router-dom";
import { DBContext } from "../../contexts/DBContext";

const categories = [
    {url: 'bildskarmar' , name: 'Bildskärmar', id: 1},
    {url: 'datorer' , name: 'Datorer', id: 2},
    {url: 'datorkomponenter' , name: 'Datorkomponenter', id: 3},
    {url: 'datortillbehor' , name: 'Datortillbehör', id: 4},
    {url: 'telefoner' , name: 'Telefoner', id: 5},
]

const LayoutContainer = () => {

    const {category} = useParams();
    const {data, searchTitle, getCategoryProducts} = useContext(DBContext);
    const {addToCart} = useContext(CartContext);

    useEffect(() => {
        if (category != null && category.toLowerCase() != "webbshop") {
            console.log(category);
            const currentCategory = categories.filter((item) => {
                return item.url === category;
            })
            getCategoryProducts(currentCategory[0].id, currentCategory[0].name);
        }
    }, [category])

    return(
        <>
        {data != null && data.length > 0 ? (
            <Container sx={{marginY: '4%', marginX: '2%'}}>
                <h3 style={{marginTop: '-4.7%', marginLeft: '2px'}}>{searchTitle}</h3>
                <Grid container spacing={2} >
                    {
                        data.map(d => (
                            <Grid item key={d.productId} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard product={d} addToCart={addToCart} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        ) : ( null )}
        </>
        
    )
}

export default LayoutContainer;