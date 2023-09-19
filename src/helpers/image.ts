import sharp from 'sharp';

/**
 * Compresses an image to AVIF format
 * @param file The image file to compress
 * @param quality The quality of the image (0-100)
 */
export const compressImage = async (file: File, quality?: number) => {
    const sharpImage = sharp(Buffer.from(await file.arrayBuffer()));

    const metadata = await sharpImage.metadata();
    if (!metadata) throw new Error('Failed to get metadata');

    const size = metadata.size;
    if (!size) throw new Error('Failed to get image size');

    if (metadata.width && metadata.height) {
        const image = await sharpImage
            .toFormat('avif', { quality: quality ?? 70 })
            .toBuffer();

        const compressionRate =
            Math.round(((size - image.length) / size) * 10000) / 100;

        console.log(`Compression rate: ${compressionRate}%`);

        return {
            buffer: image,
            type: 'image/avif',
        };
    } else
        return {
            buffer: await sharpImage.toBuffer(),
            type: file.type,
        };
};
