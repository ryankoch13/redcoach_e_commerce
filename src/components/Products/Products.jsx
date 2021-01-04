import React from 'react'
import { Grid } from '@material-ui/core'

import useStyles from './styles'
import Product from './Product/Product'

const Products = ({ products, addToCart }) => {
    const classes = useStyles()

    return(
        <main className={ classes.content }>
            <div className={ classes.toolbar } />
            <Grid container justify="center" spacing={ 4 }>
                { products.map((product) => (
                    <Grid item key={ product.id } xs={ 12 } md={ 4 } lg={ 3 }>
                        <Product product={ product } addToCart={ addToCart } />
                    </Grid>
                ))
            }
            </Grid>
        </main>
    )
}

export default Products