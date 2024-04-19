import express from 'express';
import Ingredient from '../Models/Ingredient.js';
import Recipe from '../Models/Recipe.js';
import User from '../Models/user.js';
import checkAdmin from '../Middlewares/checkAdmin.js';

import mongoose from 'mongoose';


var router = express.Router();

//add admin check here

router.post('/AddRecipe',checkAdmin, async (req, res) => {
    const { name, description, ingredients } = req.body;

    if (!req.user) {
        return res.status(401).json({ msg: 'not auth' });
    }
    try {
        if (!name || name.trim().length === 0) {
            return res.status(400).json({ msg: "Please enter a valid Recipe name" });
        }
        if (!description || description.trim().length === 0) {
            return res.status(400).json({ msg: "Please enter a valid Recipe description" });
        }
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized, please login as an admin" });
        }
        const recipe = await Recipe.findOne({ name: name }).exec();
        if (recipe) return res.status(409).send({ msg: 'a Recipe by this name already exists' })

        await Recipe.create({
            name: name,
            description: description,
            ingredients: ingredients
        });
        return res.status(201).json({ msg: 'Recipe added successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: 'Some error has occurred' });
    }
});

router.get("/", async (req, res) => {
    try {
      console.log("get all recipes");
      const recipes = await Recipe.find();
      res.json({ recipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });


export default router