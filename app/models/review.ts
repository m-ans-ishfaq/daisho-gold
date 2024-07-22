import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
    rating: number;
    review?: string;
    fullName: string;
    email: string;
    productId: mongoose.Schema.Types.ObjectId;
}

const reviewSchema = new mongoose.Schema({
    rating: Number!,
    review: String,
    fullName: String!,
    email: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: false
    }
});

export const ReviewModel =  mongoose.models.review as mongoose.Model<IReview> || mongoose.model('review', reviewSchema);