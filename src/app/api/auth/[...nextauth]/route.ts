import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        try {
          const email = (credentials as any)?.email || "";
          const password = (credentials as any)?.password || "";

          if (!email || !password) {
            throw new Error("Missing email or password");
          }

          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          if (!user.emailVerified) {
            throw new Error("Email not verified");
          }

          return {
            id: user.uid, // This id will be added to session and JWT
            email: user.email,
            name: user.displayName || "",
            image: user.photoURL || "",
          };

        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Invalid credentials or email not verified");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ensure token.id exists and is a string before assigning it to session.id
      if (token && typeof token.id === "string") {
        session.id = token.id;
      } else {
        // Handle the case where token.id is missing or is not a string
        session.id = ""; // Or some fallback value
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Ensure that id is assigned to the token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
