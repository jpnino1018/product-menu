'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ProductFormProps = {
  initialData?: {
    id?: number;
    name: string;
    price: number;
    image?: string | null;
    categoryId: number;
    brandId: number;
  };
  isEdit?: boolean;
};

type Option = {
  id: number;
  name: string;
};

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price.toString() || '');
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId?.toString() || '');
  const [brandId, setBrandId] = useState(initialData?.brandId?.toString() || '');
  const [categories, setCategories] = useState<Option[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      const [catRes, brandRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/brands'),
      ]);
      const categories = await catRes.json();
      const brands = await brandRes.json();
      setCategories(categories);
      setBrands(brands);
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = imagePreview;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await uploadRes.json();
      imageUrl = data.url;
    }

    const method = isEdit ? 'PUT' : 'POST';
    const endpoint = isEdit ? `/api/products/${initialData?.id}` : '/api/products';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        image: imageUrl,
        categoryId: parseInt(categoryId),
        brandId: parseInt(brandId),
      }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Error al guardar el producto');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Precio</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Categoría</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Marca</label>
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Selecciona una marca</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setFile(file);
            if (file) {
              setImagePreview(URL.createObjectURL(file));
            }
          }}
          className="w-full border px-3 py-2 rounded"
        />
        {imagePreview && !file && (
          <img src={imagePreview} alt="Vista previa" className="w-24 mt-2" />
        )}
        {file && (
          <img src={URL.createObjectURL(file)} alt="Vista previa" className="w-24 mt-2" />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? (isEdit ? 'Actualizando...' : 'Guardando...') : isEdit ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
}
