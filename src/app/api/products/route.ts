// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, price, image } = body;

  if (!name || !price) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: { name, price: parseFloat(price), image },
  });

  return NextResponse.json(product, { status: 201 });
}
