import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import User from "./model/userModel";
import { compare } from "bcryptjs"
import { connectDatabase } from "./libs/utils";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
       authorize: async (credentials)=> {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;


        if(!email || !password) 
            throw new CredentialsSignin("Please Provide Email and Password")

        // connect with Database 
        await connectDatabase();

        const user = await User.findOne({email}).select("+password");

        if(!user)
            throw new CredentialsSignin({cause: "email", message: "Invalid Email or Password"})

        if(!user.password)
            throw new CredentialsSignin({cause: "password", message: "Invalid Email or Password"})

        const isMatch = await compare(password, user.password);

        if(!isMatch)
            throw new CredentialsSignin({cause: "password", message: "Invalid Email or Password"})

        
            return {id: user._id, name: user.name, email: user.email};
      },
    }),
  ],
  pages: {
    signIn: "/signin",

  },
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
  },
})