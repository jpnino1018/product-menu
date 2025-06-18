// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import { ProductItem } from '@/components/products/ProductItem';
import Link from 'next/link';

export default async function HomePage() {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario de Licores</h1>
      <Link href="/new" className="text-blue-500 hover:underline mb-4 inline-block">
        Agregar Nuevo Producto
      </Link>
      <Link href="/categories/new" className="text-blue-500 hover:underline mb-4 inline-block">
        Agregar Nueva Categoría
      </Link>
      <Link href="/brands/new" className="text-blue-500 hover:underline mb-4 inline-block">
        Agregar Nueva Marca
      </Link>
      <p className="mb-4">Total de productos: {products.length}</p>
      <ul className="space-y-2">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </main>
  );
}
