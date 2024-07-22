"use server";

import { ReviewModel } from "@/app/models/review";
import { UserModel } from "@/app/models/user";
import { dbConnect } from "@/lib/dbConnect";

export async function addReview(productId: string, fullName: string, email: string, rating: number, review?: string)
{
    try {
        dbConnect();
        const alreadyGaveReview = await ReviewModel.findOne({ email, productId });
        if (alreadyGaveReview) return;
        const newReview = new ReviewModel({ productId, fullName, email, rating, review });
        console.log(newReview);
        const res = await newReview.save();
        return JSON.stringify(res);
    } catch(err) {
        console.error(err);
    }
}

export async function addReviewById(id: string, productId: string, rating: number, review?: string)
{
    try {
        dbConnect();
        const user = await UserModel.findById(id);
        if (!user) return;
        return addReview(productId, user.fullName, user.email, rating, review);
    } catch(err) {
        console.error(err);
    }
}

export async function deleteReviewById(id: string)
{
    try {
        dbConnect();
        const res = await ReviewModel.findByIdAndDelete(id);
        return JSON.stringify(res);
    } catch(err) {
        console.error(err);
    }
}