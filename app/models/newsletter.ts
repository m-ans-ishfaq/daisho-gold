import mongoose, { Document } from "mongoose";

export interface INewsletter extends Document {
    email: string;
}

const newsletterSchema = new mongoose.Schema({
    email: String!
});

export const NewsLetterModel =  mongoose.models.newsletter as mongoose.Model<INewsletter> || mongoose.model('newsletter', newsletterSchema);