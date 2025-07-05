'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/UseCurrentUser';
import Unauthorized from '@/components/common/unauthorized';

type Category = {
  id: number;
  name: string;
};

export default function BrandForm() {
  const { isAdmin, loadingAdmin } = useCurrentUser();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => {
        console.error('Error al cargar categorías', err);
        alert('Error al cargar categorías');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      alert('Por favor selecciona una categoría');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, categoryId }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Error al crear marca');
    }

    setLoading(false);
  };

  if (loadingAdmin) return null;
  if (!isAdmin) {
    return <Unauthorized />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Nueva Marca</h1>
      <div>
        <label className="block font-medium">Nombre de la marca</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Categoría</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}
