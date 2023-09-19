import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import env from '@env';

const s3 = new S3Client({
    endpoint: env.BACKBLAZE_BUCKET_ENDPOINT,
    region: env.BACKBLAZE_BUCKET_REGION,
    credentials: {
        accessKeyId: env.BACKBLAZE_APPLICATION_KEY_ID,
        secretAccessKey: env.BACKBLAZE_APPLICATION_KEY,
    },
});

export const uploadFile = async (file: Buffer, type: string, key: string) => {
    const command = new PutObjectCommand({
        Bucket: env.BACKBLAZE_BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: type,
    });

    await s3.send(command);

    return `https://${env.BACKBLAZE_CDN_URL}/file/${env.BACKBLAZE_BUCKET_NAME}/${key}`;
};

export const deleteFile = async (key: string) => {
    const command = new DeleteObjectCommand({
        Bucket: env.BACKBLAZE_BUCKET_NAME,
        Key: key,
    });

    await s3.send(command);
};
