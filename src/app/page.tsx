// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import ProductListWithFilters from '@/components/products/ProductList';
import Image from 'next/image';

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
      <div className="flex items-center justify-center mb-4 bg-navbar p-4 rounded-lg">
        <Image
          src="/licores-mercastillosf.png"
          alt="Logo Mercastillo"
          width={150}      
          height={40}
          priority
        />
      </div>

      <ProductListWithFilters
        products={products}
        categories={categories}
        brands={brands}
      />
    </main>
  );
}
