import express from 'express';
import checkAdmin from '../Middlewares/checkAdmin.js';
import Ingredient from '../Models/Ingredient.js';



var router = express.Router();

//add admin check here

router.post('/AddIngredient',checkAdmin, async (req, res) => {
    const { name, description } = req.body;

    if (!req.user) {
        return res.status(401).json({ msg: 'not auth' });
    }
    try {
        if (!name || name.trim().length === 0) {
            return res.status(400).json({ msg: "Please enter a valid Ingredient name" });
        }
        if (!description || description.trim().length === 0) {
            return res.status(400).json({ msg: "Please enter a valid Ingredient description" });
        }
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized, please login as an admin" });
        }
        const ingredient = await Ingredient.findOne({ name: name }).exec();
        if (ingredient) return res.status(409).send({ msg: 'an Ingredient by this name already exists' })

        await Ingredient.create({
            name: name,
            description: description
        });
        return res.status(201).json({ msg: 'Ingredient added successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: 'Some error has occurred' });
    }
});

router.get("/", async (req, res) => {
    try {
      console.log("get all Ingredients");
      const ingredients = await Ingredient.find();
      res.json({ ingredients });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });



export default router