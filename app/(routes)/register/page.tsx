import { AuthBg } from "@/app/assets";
import Image from "next/image";
import { RegisterForm } from "./components/form";

export default function Register()
{
    return (
        <main className="flex justify-center items-center w-full min-h-[calc(100vh-5rem)] relative">
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />
            <Image src={AuthBg} alt="" className="w-full h-full object-cover absolute top-0 left-0" />
            <div className="w-full flex justify-center relative z-20 py-20 p-4 rounded-lg">
                <RegisterForm />
            </div>
        </main>
    )
}