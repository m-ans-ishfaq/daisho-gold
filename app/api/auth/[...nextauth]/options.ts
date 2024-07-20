import { UserModel } from "@/app/models/user";
import { dbConnect } from "@/lib/dbConnect";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // For admin
                if (credentials?.email === process.env.ADMIN_EMAIL && credentials?.password === process.env.ADMIN_PASSWORD) {
                    return { id: "1", role: "admin" };
                }
                await dbConnect();
                const user = await UserModel.findOne({ email: credentials?.email, password: credentials?.password });
                console.log(user);
                console.log("Id", user?._id);
                if (!user) return null;
                else return { id: user._id as string, role: "customer" };
            }
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        // })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/log-in",
        newUser: "/"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};