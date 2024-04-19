import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
        default: []
    },
    createdAt: {type: Date, default: new Date()}
})
export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema)