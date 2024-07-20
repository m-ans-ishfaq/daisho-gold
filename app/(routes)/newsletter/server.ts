"use server";

import { NewsLetterModel } from "@/app/models/newsletter";
import { dbConnect } from "@/lib/dbConnect";

export async function SubscribeToNewsletter(email: string)
{
    try {
        dbConnect();
        const newsLetterSubscriber = new NewsLetterModel({ email });
        const res = await newsLetterSubscriber.save();
        return JSON.stringify(res);
    } catch (err) {
        console.error(err);
    }
}