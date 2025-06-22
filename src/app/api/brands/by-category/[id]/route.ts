import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const categoryId = parseInt(params.id);

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: 'ID de categoría inválido' }, { status: 400 });
  }

  const brands = await prisma.brand.findMany({
    where: { categoryId },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(brands);
}
