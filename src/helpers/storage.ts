import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import env from '@env';

const s3 = new S3Client({
    endpoint: env.BACKBLAZE_BUCKET_ENDPOINT,
    region: env.BACKBLAZE_BUCKET_REGION,
    credentials: {
        accessKeyId: env.BACKBLAZE_APPLICATION_KEY_ID,
        secretAccessKey: env.BACKBLAZE_APPLICATION_KEY,
    },
});

export const uploadFile = async (file: File, dir?: string, key?: string) => {
    const arrayBuffer = await file.arrayBuffer();

    // const key = dir ? `${dir}/${uuid()}` : uuid();
    const _key = key ? key : dir ? `${dir}/${uuid()}` : uuid();

    const command = new PutObjectCommand({
        Bucket: env.BACKBLAZE_BUCKET_NAME,
        Key: _key,
        Body: Buffer.from(arrayBuffer),
        ContentType: file.type,
    });

    await s3.send(command);
    return `https://${env.BACKBLAZE_CDN_URL}/file/${env.BACKBLAZE_BUCKET_NAME}/${_key}`;
};

export const deleteFile = async (key: string, dir?: string) => {
    const command = new DeleteObjectCommand({
        Bucket: env.BACKBLAZE_BUCKET_NAME,
        Key: dir ? `${dir}/${key}` : key,
    });

    await s3.send(command);
};
