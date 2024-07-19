import mongoose, { Document } from "mongoose";

export interface IProductDocument extends Document {
    title: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    category: mongoose.Schema.Types.ObjectId;
}

const productSchema = new mongoose.Schema({
    title: String!,
    description: String!,
    price: Number!,
    images: [String!],
    stock: Number!,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: false }
});

export const ProductModel =  mongoose.models.product as mongoose.Model<IProductDocument> || mongoose.model('product', productSchema);