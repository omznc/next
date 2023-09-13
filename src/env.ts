import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
    // These are only visible to server-side code
    server: {
        DATABASE_URL: z
            .string({
                description: 'Postgres database URL',
                required_error: 'DATABASE_URL is required',
            })
            .url({
                message: 'DATABASE_URL must be a valid URL (postgres://)',
            }),
        DIRECT_URL: z
            .string({
                description:
                    'Direct URL to the database (if pooling, otherwise delete this)',
                required_error: 'DIRECT_URL is required',
            })
            .url({
                message: 'DIRECT_URL must be a valid URL (postgres://)',
            }),
        GOOGLE_CLIENT_ID: z.string({
            description: 'Google OAuth Client ID',
            required_error: 'GOOGLE_CLIENT_ID is required',
        }),
        GOOGLE_CLIENT_SECRET: z.string({
            description: 'Google OAuth Client Secret',
            required_error: 'GOOGLE_CLIENT_SECRET is required',
        }),
        NEXTAUTH_SECRET: z.string({
            description:
                'Secret used to sign next-auth tokens (https://generate-secret.vercel.app/32)',
            required_error: 'NEXTAUTH_SECRET is required',
        }),
        NEXTAUTH_URL: z
            .string({
                description:
                    'The final, public-facing app URL. (http://localhost:3000 for local development, default)',
                required_error: 'NEXTAUTH_URL is required',
            })
            .url({
                message: 'NEXTAUTH_URL must be a valid URL',
            }),
        BACKBLAZE_BUCKET_NAME: z.string({
            description: 'Backblaze B2 Bucket Name',
            required_error: 'BACKBLAZE_BUCKET_NAME is required',
        }),
        BACKBLAZE_BUCKET_ENDPOINT: z.string({
            description: 'Backblaze B2 Bucket Endpoint',
            required_error: 'BACKBLAZE_BUCKET_ENDPOINT is required',
        }),
        BACKBLAZE_BUCKET_REGION: z.string({
            description: 'Backblaze B2 Bucket Region',
            required_error: 'BACKBLAZE_BUCKET_REGION is required',
        }),
        BACKBLAZE_APPLICATION_KEY_ID: z.string({
            description: 'Backblaze B2 Application Key ID',
            required_error: 'BACKBLAZE_APPLICATION_KEY_ID is required',
        }),
        BACKBLAZE_APPLICATION_KEY: z.string({
            description: 'Backblaze B2 Application Key',
            required_error: 'BACKBLAZE_APPLICATION_KEY is required',
        }),

        // Routing through Cloudflare for 0 fees.
        BACKBLAZE_CDN_URL: z.string({
            description: 'Backblaze B2 CDN URL',
            required_error: 'BACKBLAZE_CDN_URL is required',
        }),
    },
    // These are visible to both server-side and client-side code
    client: {},
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        DIRECT_URL: process.env.DIRECT_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        BACKBLAZE_BUCKET_NAME: process.env.BACKBLAZE_BUCKET_NAME,
        BACKBLAZE_BUCKET_REGION: process.env.BACKBLAZE_BUCKET_REGION,
        BACKBLAZE_BUCKET_ENDPOINT: process.env.BACKBLAZE_BUCKET_ENDPOINT,
        BACKBLAZE_APPLICATION_KEY_ID: process.env.BACKBLAZE_APPLICATION_KEY_ID,
        BACKBLAZE_APPLICATION_KEY: process.env.BACKBLAZE_APPLICATION_KEY,
        BACKBLAZE_CDN_URL: process.env.BACKBLAZE_CDN_URL,
    },
});

export default env;