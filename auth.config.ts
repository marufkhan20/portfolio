import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import type { NextRequest } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({
      auth,
      request,
    }: {
      auth: { user?: any } | null;
      request: NextRequest;
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = request.nextUrl.pathname.startsWith("/admin");
      if (isOnAdmin) {
        return isLoggedIn;
      }
      return true;
    },
    jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = String(user.id);
        token.email = String(user.email);
        token.name = String(user.name);
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = String(token.id);
        session.user.email = String(token.email);
        session.user.name = String(token.name);
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "admin@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        console.log("Received credentials:", credentials); // Debugging log
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
          throw new Error("Admin credentials not configured");
        }

        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            email: process.env.ADMIN_EMAIL,
            name: "Admin",
          };
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
};
