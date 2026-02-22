import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { supabase, supabaseAdmin } from '@/lib/supabase';

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

        // Create a unique filename
        const ext = file.name.split('.').pop();
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        // Convert the File object to a Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Try Supabase Storage First
        const storageClient = supabaseAdmin || supabase;
        if (storageClient) {
            const supabaseFilePath = `${folderName}/${filename}`;

            const { data: uploadData, error: uploadError } = await storageClient.storage
                .from('portfolio_media')
                .upload(supabaseFilePath, buffer, {
                    contentType: file.type,
                    upsert: false
                });

            if (!uploadError) {
                // Determine the public URL
                const { data: publicUrlData } = storageClient.storage
                    .from('portfolio_media')
                    .getPublicUrl(supabaseFilePath);

                return NextResponse.json({ url: publicUrlData.publicUrl });
            } else {
                console.error("Supabase Storage Upload Error:", uploadError.message);

                // If we're on Vercel, local fallback won't work anyway, so fail early
                if (process.env.VERCEL) {
                    return NextResponse.json({
                        error: `Supabase Upload Failed: ${uploadError.message}. Pastikan bucket 'portfolio_media' sudah ada dan bersifat Public di Supabase.`,
                        details: uploadError
                    }, { status: 500 });
                }
            }
        }

        // Fallback: Local filesystem (fails gracefully in Vercel to prevent 500 error)
        const publicUrl = `/${folderName}/${filename}`;

        if (!process.env.VERCEL) {
            try {
                // Ensure the upload directory exists
                const uploadDir = path.join(process.cwd(), 'public', folderName);
                await fs.mkdir(uploadDir, { recursive: true });

                const filePath = path.join(uploadDir, filename);

                // Write to disk
                await fs.writeFile(filePath, buffer);
            } catch (fsError: any) {
                console.warn("Could not save file locally:", fsError.message);
            }
        }

        return NextResponse.json({
            url: publicUrl,
            warning: process.env.VERCEL ? "Local fallback is not persistent on Vercel" : undefined
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
    }
}
