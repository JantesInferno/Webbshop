import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/material";
import ProductCard from "../product_card/ProductCard";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useParams } from "react-router-dom";
import { DBContext } from "../../contexts/DBContext";

const LayoutContainer = () => {

    const {data} = useContext(DBContext);
    const {addToCart} = useContext(AppContext);
    const {category} = useParams();

    useEffect(() => {
        console.log(data)
     }, [data])

    return(
        <>
            <Container sx={{marginY: '4%', marginX: '2%'}}>
                <h3 style={{marginTop: '-4.5%'}}>{category}</h3>
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