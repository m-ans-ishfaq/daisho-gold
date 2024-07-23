"use server";

import { ContactModel } from "@/app/models/contact";
import { dbConnect } from "@/lib/dbConnect";

export async function submitContactUsForm(fullName: string, email: string, country: string, telephone: string, query: string)
{
    await dbConnect();
    try {
        const contactForm = new ContactModel({ fullName, email, country, telephone, query });
        const res = await contactForm.save();
        return JSON.stringify(res);
    } catch(err) {
        console.error(err);
    }
}