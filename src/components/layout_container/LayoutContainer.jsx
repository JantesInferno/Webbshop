import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/material";
import ProductCard from "../product_card/ProductCard";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useParams } from "react-router-dom";
import { DBContext } from "../../contexts/DBContext";

const LayoutContainer = () => {

    const {category} = useParams();
    const {data, searchTitle} = useContext(DBContext);
    const {addToCart} = useContext(CartContext);

    return(
        <>
            <Container sx={{marginY: '4%', marginX: '2%'}}>
                <h3 style={{marginTop: '-4.7%', marginLeft: '2px'}}>{searchTitle}</h3>
                <Grid container spacing={2} >
                    {
                        data.map(d => (
                            <Grid item key={d.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard product={d} addToCart={addToCart} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </>
        
    )
}

export default LayoutContainer;