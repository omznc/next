import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import env from '@env';
import prisma from '@helpers/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const authOptions: AuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: env.NEXTAUTH_SECRET,
    session: {
        strategy: 'database',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user = user;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
