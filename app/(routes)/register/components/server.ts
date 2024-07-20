"use server";

import { UserModel } from "@/app/models/user";
import { dbConnect } from "@/lib/dbConnect";
import { SubscribeToNewsletter } from "../../newsletter/server";

export async function registerUser(
    fullName: string,
    email: string,
    telephone: string,
    password: string,
    subscribeToNewsLetter: boolean,
    homeAddress?: string
) {

    let success = false;

    try {
        dbConnect();
        const newUser = new UserModel({ fullName, email, telephone, password, homeAddress });
        await newUser.save();
        success = true;
    } catch (err) {
        console.error(err);
    }

    if (subscribeToNewsLetter) {
        try {
            await SubscribeToNewsletter(email);
        } catch (err) {
            console.error(err);
        }
    }

    return success;
}