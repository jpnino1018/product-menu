import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 });
  }

  try {
    const brand = await prisma.brand.create({ data: { name } });
    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear marca' }, { status: 500 });
  }
}

export async function GET() {
  const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(brands);
}
