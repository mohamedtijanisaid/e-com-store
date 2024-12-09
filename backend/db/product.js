const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    price: Number,
    discount: Number,
    images: [String], // Corrigé pour un tableau de chaînes
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories' },
    brandId: { type: Schema.Types.ObjectId, ref: 'brands' },
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: true },
    
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
