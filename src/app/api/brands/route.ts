import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, categoryId } = await req.json();

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 });
  }

  if (!categoryId || typeof categoryId !== 'number') {
    return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
  }

  try {
    const brand = await prisma.brand.create({
      data: {
        name,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    console.error('Error al crear marca:', error);
    return NextResponse.json({ error: 'Error al crear marca' }, { status: 500 });
  }
}


export async function GET() {
  const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(brands);
}
