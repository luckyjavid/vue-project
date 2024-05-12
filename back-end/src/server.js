import express from 'express'; 
import { cartItems as cartItemsRaw , products as productsRaw } from './temp-data'

let cartItems = cartItemsRaw; 
let products = productsRaw; 

const app = express(); 
app.use(express.json());

/* helper function */
function populateCartIds(ids) {
    return ids.map(id => products.find(product => product.id === id));
}

app.get('/hello', (req, res) => {
    res.send('Hello!');
})

app.get('/bye', (req, res) => {
    res.send('Ciao!');
})

app.get('/products', (req, res) => {
    res.json(products);
})

app.get('/shopping-cart', (req, res) => {
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
})

app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const prodcut = products.find(product => product.id === productId);
    res.json(prodcut);
})


app.post('/shopping-cart', (req, res) => {
    const productId = req.body.id; 
    cartItems.push(productId);
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
})

app.delete('/shopping-cart/:productId', (req, res) => {
    const productId = req.params.id; 
    cartItems = cartItems.filter(id => id !== productId); 
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
})

app.listen(8000,  () => {
    console.log('Server is listening on port 8000')
})