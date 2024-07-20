import mongoose, { Document } from "mongoose";

export interface IUserDocument extends Document {
    fullName: string;
    email: string;
    homeAddress?: string;
    telephone: string;
    password: number;
}

const userSchema = new mongoose.Schema({
    fullName: String!,
    email: {
        type: String,
        required: true,
        unique: true
    },
    homeAddress: String,
    telephone: String!,
    password: String!
});

export const UserModel =  mongoose.models.user as mongoose.Model<IUserDocument> || mongoose.model('user', userSchema);