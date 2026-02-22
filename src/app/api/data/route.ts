import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';

const dataFilePath = path.join(process.cwd(), 'data', 'db.json');
const TABLE_NAME = 'portfolio_data';

export async function GET() {
    try {
        // Try Supabase first
        if (supabase) {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('data')
                .eq('id', 1)
                .single();

            if (!error && data) {
                return NextResponse.json(data.data);
            }
        }

        // Fallback to local file
        const fileContent = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // Authenticate the request first (check cookie)
        const authCookie = request.headers.get('cookie')?.includes('admin_session=true');
        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Try to save to Supabase
        if (supabase) {
            const { error } = await supabase
                .from(TABLE_NAME)
                .upsert({ id: 1, data: body });

            if (!error) {
                // Also update local file as backup
                await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf8');
                return NextResponse.json({ success: true, message: 'Data saved to Supabase' });
            }
            console.error("Supabase save error:", error.message);
        }

        // Fallback save to local file
        await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ success: true, message: 'Data saved to local backup' });
    } catch (error) {
        console.error("Failed to save database:", error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
