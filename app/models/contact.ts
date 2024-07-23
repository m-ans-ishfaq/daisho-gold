import mongoose, { Document } from "mongoose";

export interface IContactDocument extends Document {
    fullName: string;
    email: string;
    telephone: string;
    query: string;
    country: string;
    date: Date;
}

const contactSchema = new mongoose.Schema({
    fullName: String!,
    email: String!,
    telephone: String!,
    query: String!,
    country: String!,
    date: {
        type: Date,
        default: new Date()
    }
});

export const ContactModel =  mongoose.models.contact as mongoose.Model<IContactDocument> || mongoose.model('contact', contactSchema);