import { DefaultUser } from 'next-auth';
import { User as PrismaUser } from '@prisma/client';

interface IUser extends DefaultUser, PrismaUser {}

declare module 'next-auth' {
    interface User extends IUser {}

    interface Session {
        user?: User;
    }

    // 	extend profile to include email_verified
    interface Profile {
        email_verified?: boolean;
        email?: string;
    }
}