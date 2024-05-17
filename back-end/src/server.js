import express from 'express'; 
import { cartItems as cartItemsRaw , products as productsRaw } from './temp-data'
import { MongoClient } from 'mongodb'
require('dotenv').config();

let cartItems = cartItemsRaw; 
let products = productsRaw; 

async function start() {
    // connect to mongo db
    const mongodbPassword = process.env.MONGODB_PASSWORD;
    const url = `mongodb+srv://javidhussainf:${mongodbPassword}@cluster-jay.bckmk1e.mongodb.net/?retryWrites=true&w=majority&appName=cluster-jay`;
    const client = new MongoClient(url); 
    await client.connect(); 
    const db = client.db('fsv-db'); 

    const app = express();  
    app.use(express.json());

    /* helper function */
    async function populateCartIds(ids) { 
        return Promise.all(ids.map( id => db.collection('products').findOne({ id }) ));
    }

    app.get('/hello',  (req, res) => {
        res.send('hi');
    })

    app.get('/bye', (req, res) => {
        res.send('Ciao!');
    })

    app.get('/products', async (req, res) => {
        const products = await db.collection('products').find({}).toArray(); 
        res.send(products);
    })

    app.get('/users/:userId/shopping-cart', async (req, res) => {
        const user = await db.collection('users').findOne({id: req.params.userId}); 
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    })

    app.get('/products/:productId', async (req, res) => {
        const productId = req.params.productId;
        const prodcut = await db.collection('products').findOne({ id: productId});
        res.json(prodcut);
    })

    app.post('/users/:userId/shopping-cart', async(req, res) => {
        const userId = req.params.userId; 
        const productId = req.body.id; 

        await db.collection('users').updateOne({ id: userId}, {
            $addToSet: { cartItems: productId } // addToSet: add productId to cartItems without duplicate
        });

        const user = await db.collection('users').findOne({id: req.params.userId}); 
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    })

    app.delete('/users/:userId/shopping-cart/:productId', async (req, res) => {
        const userId = req.params.userId; 
        const productId = req.params.productId; 

        await db.collection('users').updateOne({ id: userId}, {
            $pull: { cartItems: productId } // pull: remove productId from cartItems without duplicate
        });

        const user = await db.collection('users').findOne({id: req.params.userId}); 
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    })

    app.listen(8000,  () => {
        console.log('Server is listening on port 8000')
    })
}

start(); 
