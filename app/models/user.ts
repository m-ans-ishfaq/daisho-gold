import mongoose, { Document } from "mongoose";

export interface IUserDocument extends Document {
    title: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

const userSchema = new mongoose.Schema({
    title: String!,
    description: String!,
    price: Number!,
    image: String!,
    stock: Number!
});

export const UserModel =  mongoose.models.user as mongoose.Model<IUserDocument> || mongoose.model('user', userSchema);