import express from 'express'; 
import { cartItems as cartItemsRaw , products as productsRaw } from './temp-data'
import { MongoClient } from 'mongodb'
require('dotenv').config();

let cartItems = cartItemsRaw; 
let products = productsRaw; 
const mongodbPassword = process.env.MONGODB_PASSWORD;

//const mongodbPassword = process.env.VUE_APP_MONGODB_PASSWORD;
const url = `mongodb+srv://javidhussainf:8hBxDku2tZMxyDP5@cluster-jay.bckmk1e.mongodb.net/?retryWrites=true&w=majority&appName=cluster-jay`
const client = new MongoClient(url); 

const app = express();  
app.use(express.json());

/* helper function */
function populateCartIds(ids) { 
    return ids.map(id => products.find(product => product.id === id));
}

app.get('/hello',  (req, res) => {
    res.send(mongodbPassword);
})

app.get('/bye', (req, res) => {
    res.send('Ciao!');
})

app.get('/products', async (req, res) => {
    await client.connect(); 
    const db = client.db('fsv-db'); 
    const products = await db.collection('products').find({}).toArray(); 
    res.send(products);
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