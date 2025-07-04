import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteImage } from '@/lib/supabase/storage';
import { isAdminRequest } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  if (!isAdminRequest()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    if (product.image) {
      const deleted = await deleteImage(product.image);
      if (deleted) {
        console.log(`Imagen eliminada en Supabase: ${product.image}`);
      } else {
        console.warn(`No se pudo eliminar la imagen de Supabase`);
      }
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}


export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }
  if (!isAdminRequest()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }
  const { name, price, image, categoryId, brandId } = await req.json();

  if (!name || !price || !categoryId || !brandId) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const oldImage = existingProduct.image;
    const isImageUpdated = image && image !== oldImage;

    if (oldImage && isImageUpdated) {
      const deleted = await deleteImage(oldImage);
      if (deleted) {
        console.log(`Imagen anterior eliminada en Supabase: ${oldImage}`);
      } else {
        console.warn(`No se pudo eliminar la imagen anterior de Supabase`);
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        image: image || null,
        category: { connect: { id: categoryId } },
        brand: { connect: { id: brandId } },
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
