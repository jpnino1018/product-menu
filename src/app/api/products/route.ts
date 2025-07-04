import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '@/lib/auth';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: {
      category: true,
      brand: true,
    },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { name, price, image, categoryId, brandId } = body;

    if (!name || !price || !categoryId || !brandId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        image: image || null,
        category: { connect: { id: categoryId } },
        brand: { connect: { id: brandId } },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
