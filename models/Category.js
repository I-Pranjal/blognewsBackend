import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    cat_Name: { type: String, required: true },
    entries: { type: Number, required: true }
});
const Category = mongoose.model('Category', categorySchema);

export default Category;