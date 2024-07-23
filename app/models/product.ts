import mongoose, { Document } from "mongoose";

export interface IProductCard
{
    _id: string,
    outOfStock: boolean,
    title: string,
    isCouponAvailable: boolean,
    price: number,
    currency: string,
    image: string,
    bike?: string,
    category?: string
}

export interface IProductDocument extends Document {
    title: string;
    description: string;
    price: number;
    bike: string;
    category: string;
    images: string[];
    stock: number;
}

const productSchema = new mongoose.Schema({
    title: String!,
    description: String!,
    price: Number!,
    bike: String!,
    category: String!,
    images: [String!],
    stock: Number
});

export const ProductModel =  mongoose.models.product as mongoose.Model<IProductDocument> || mongoose.model('product', productSchema);