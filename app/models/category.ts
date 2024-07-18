import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
    title: String;
    image: String;
}

const categorySchema = new mongoose.Schema({
    title: String,
    image: String
});

export const CategoryModel =  mongoose.models.category as mongoose.Model<ICategory> || mongoose.model('category', categorySchema);