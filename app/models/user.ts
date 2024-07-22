import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface ICartItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    dateAdded: Date;
}

export interface IUserDocument extends Document {
    fullName: string;
    email: string;
    homeAddress?: string;
    telephone: string;
    password: number;
    cart: ICartItem[];
}

const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    fullName: String!,
    email: {
        type: String,
        required: true,
        unique: true
    },
    homeAddress: String,
    telephone: String!,
    password: String!,
    cart: {
        type: [cartItemSchema],
        default: []
    }
});

export const UserModel =  mongoose.models.user as mongoose.Model<IUserDocument> || mongoose.model('user', userSchema);