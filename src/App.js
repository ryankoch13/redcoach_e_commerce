import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {Products, Navbar, Cart, Checkout } from './components'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()

        setProducts(data)
    }

    
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const addToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)
        
        setCart(cart)
    }

    const updateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })

        setCart(cart)
    }

    const removeFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)

        setCart(cart)
    }

    const emptyCart = async () => {
        const { cart } = await commerce.cart.empty()

        setCart(cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])
    
    console.log(cart)

    return (
        <Router>
            <div>
                <Navbar totalItems={ cart.total_items } />
                <Switch>
                    <Route exact path="/">
                        <Products products={ products } addToCart={ addToCart } />
                    </Route>
                    <Route exact path="/cart">
                        <Cart 
                        cart={ cart } 
                        updateCartQty= { updateCartQty }
                        removeFromCart = { removeFromCart }
                        emptyCart = { emptyCart }
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App