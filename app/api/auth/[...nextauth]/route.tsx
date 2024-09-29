import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import  prisma  from "@/prisma/client"
import { Adapter } from "next-auth/adapters";
import bcrypt from 'bcrypt';



const handler = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter, 
    providers:[
      CredentialsProvider({

        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
          password: { label: "Password", type: "password", placeholder: "*******" }
        },
        async authorize(credentials, req) {
          if(!credentials?.email || !credentials.password) return null;
          
          const user = await prisma.user.findUnique({
            where: {email: credentials.email}
          });
          
          if (!user) return null;
          
          const passwordsMatch = await bcrypt.compare(credentials.password,
             user.hashedPassword!
            );

            return passwordsMatch ? user: null;
        },
      }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
  ],
  session:{
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }