import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        let folderName = (formData.get('folder') as string) || 'uploads';

        // Sanitize folder name to prevent path traversal
        folderName = folderName.replace(/[^a-zA-Z0-9_-]/g, '');

        if (!file) {
            return NextResponse.json({ error: 'No file received.' }, { status: 400 });
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type.' }, { status: 400 });
        }

        // Ensure the upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', folderName);
        await fs.mkdir(uploadDir, { recursive: true });

        // Create a unique filename
        const ext = file.name.split('.').pop();
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = path.join(uploadDir, filename);

        // Convert the File object to a Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Write to disk
        await fs.writeFile(filePath, buffer);

        // Return the public URL
        const publicUrl = `/${folderName}/${filename}`;

        return NextResponse.json({ url: publicUrl });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
    }
}
