'use client';

import { useState, useCallback } from 'react';
import ProductFilters from '@/components/Filters';
import { ProductItem } from './ProductItem';
import { Card } from '@/components/ui/card';

type Option = { id: number; name: string };

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  brand: Option;
  category: Option;
};

type Props = {
  products: Product[];
  categories: Option[];
  brands: Option[];
};

export default function ProductListWithFilters({ products, categories, brands }: Props) {
  const [filtered, setFiltered] = useState<Product[]>(products);

  const handleFilterChange = useCallback(
    (filters: { search: string; categoryId: string; brandId: string }) => {
      const { search, categoryId, brandId } = filters;

      const result = products.filter((product) => {
        const matchName = product.name.toLowerCase().includes(search.toLowerCase());
        const matchBrand = brandId ? product.brand.id === parseInt(brandId) : true;
        const matchCategory = categoryId ? product.category.id === parseInt(categoryId) : true;
        return matchName && matchBrand && matchCategory;
      });

      setFiltered(result);
    },
    [products]
  );

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <ProductFilters categories={categories} onChange={handleFilterChange} />
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">No se encontraron productos.</Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
