import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.password) {
            throw new Error("User not found or no password set");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.error("Authorization Error:", error.message);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await db.user.findUnique({ where: { id: user.id } });

      if (!existingUser?.emailVerified) return false;

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
