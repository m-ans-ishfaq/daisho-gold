"use server";

import { UserModel } from "@/app/models/user";
import { dbConnect } from "@/lib/dbConnect";

export async function getFullnameById(id: string)
{
    await dbConnect();
    // Case of admin
    if (id === "1") return "Admin";
    try {
        const user = await UserModel.findById(id, { fullName: 1 });
        return user?.fullName;
    } catch(err) {
        console.error(err);
    }
}