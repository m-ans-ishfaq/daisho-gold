import mongoose, { Document } from "mongoose";

export interface IProductDocument extends Document {
    title: string;
    price: number;
    image: string;
    stock: number;
}

const productSchema = new mongoose.Schema({
    title: String!,
    price: Number!,
    image: String!,
    stock: Number!
});

export const ProductModel =  mongoose.models.product as mongoose.Model<IProductDocument> || mongoose.model('product', productSchema);