// src/app/api/products/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    // 1. Obtener producto
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    // 2. Borrar imagen si existe
    if (product.image && product.image.startsWith('/uploads/')) {
      const imagePath = path.join(process.cwd(), 'public', product.image);
      try {
        await fs.unlink(imagePath);
        console.log(`Imagen eliminada: ${imagePath}`);
      } catch (err) {
        console.warn(`No se pudo borrar la imagen: ${imagePath}`, err);
      }
    }

    // 3. Eliminar producto
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
