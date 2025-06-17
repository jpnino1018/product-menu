// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import { Product } from '@/generated/prisma';
import Link from 'next/link';

export default async function HomePage() {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario de Licores</h1>
      <Link href="/new" className="text-blue-500 hover:underline mb-4 inline-block">
        Agregar Nuevo Producto
      </Link>
      <p className="mb-4">Total de productos: {products.length}</p>
      <ul className="space-y-2">
        {products.map((product: Product) => (
          <li key={product.id} className="border p-4 rounded">
            <p className="font-semibold">{product.name}</p>
            <p>${product.price.toLocaleString('es-CO')}</p>
            {product.image && (
              <img src={product.image} alt={product.name} className="w-24 mt-2" />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
