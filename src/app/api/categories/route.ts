import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '@/lib/auth';

export async function POST(req: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { name } = await req.json();

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 });
  }

  try {
    const category = await prisma.category.create({ data: { name } });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear categoría' }, { status: 500 });
  }
}

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(categories);
}
