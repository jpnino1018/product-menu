'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Option = {
  id: number;
  name: string;
};

type Props = {
  categories: Option[];
  onChange: (filters: { search: string; categoryId: string; brandId: string }) => void;
};

export default function ProductFilters({ categories, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const [brandId, setBrandId] = useState('all');
  const [brands, setBrands] = useState<Option[]>([]);

  useEffect(() => {
    onChange({
      search,
      categoryId: categoryId === 'all' ? '' : categoryId,
      brandId: brandId === 'all' ? '' : brandId,
    });
  }, [search, categoryId, brandId, onChange]);

  useEffect(() => {
    if (categoryId === 'all') {
      setBrands([]);
      setBrandId('all');
      return;
    }

    const fetchBrands = async () => {
      const res = await fetch(`/api/brands/by-category/${categoryId}`);
      const data = await res.json();
      setBrands(data);
    };

    fetchBrands();
    setBrandId('all');
  }, [categoryId]);

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <div>
        <Label className="mb-1 block">Buscar por nombre</Label>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <Label className="mb-1 block">Categoría</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1 block">Marca</Label>
        <Select
          value={brandId}
          onValueChange={setBrandId}
          disabled={!brands.length}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las marcas</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
