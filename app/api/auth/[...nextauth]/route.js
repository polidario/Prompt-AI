import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { dbConnection } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            // Make sure to always update the session
            const user = await User.findOne({ email: session.user.email });
            session.user.id = user._id.toString();
    
            return session;
        },
        async signIn({ profile }) {
            try {
                await dbConnection();
    
                const userExists = await User.findOne({
                    email: profile.email
                });
    
                if( !userExists ) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
    
                return true;
            } catch(err) {
                console.log("Error checking if user exists: ", err.message);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };