// app/api/upload/route.ts
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  const uniqueName = `${Date.now()}-${file.name}`;

  const filePath = path.join(uploadDir, uniqueName);

  await writeFile(filePath, buffer);

  return NextResponse.json({ message: 'Archivo subido', url: `/uploads/${uniqueName}` });
}
