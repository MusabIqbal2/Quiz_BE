import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: {type: Date, default: new Date()}
})
export default mongoose.model('Ingredient', IngredientSchema)