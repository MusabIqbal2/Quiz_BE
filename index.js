import express from 'express';
import mongoose from 'mongoose';
//import User from './Models/User.js'
import authRouter from './Routes/auth.js'
import ingredientRouter from './Routes/ingredient.js'
import recipeRouter from './Routes/Recipe.js'

import jwt from 'jsonwebtoken'
import parseJwt from './Middlewares/parseJwt.js';
import cors from "cors";

const SecretKey = 'My_Secret_Key';

const app = express();

const main = async () => {
    try {
        await mongoose.connect("mongodb+srv://musabiqbal2:wMkkrQZVz7WNf0NJ@cluster0.lycnmlj.mongodb.net/")
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
await main();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req,res)=>{
    res.send('hello world');
})

app.use('/auth', authRouter)

app.use(parseJwt);

app.use('/ingredient', ingredientRouter)
app.use('/recipe', recipeRouter)

app.use((req, res, next) => {
    res.status(404).json({ error: 'URL Not Found' });
    next();
});

const PORT = process.env.PORT || 5600;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});