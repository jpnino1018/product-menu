// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ProductListWithFilters from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';

export default async function HomePage() {
  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({
      include: { brand: true, category: true },
      orderBy: { name: 'asc' },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.brand.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Inventario de Licores</h1>

        {/* Botón de admin */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Admin settings">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/new">Agregar Nuevo Producto</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/categories/new">Agregar Nueva Categoría</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/brands/new">Agregar Nueva Marca</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="mb-4">Total de productos: {products.length}</p>

      <ProductListWithFilters
        products={products}
        categories={categories}
        brands={brands}
      />
    </main>
  );
}
