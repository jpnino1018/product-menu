'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/UseCurrentUser';
import Unauthorized from '@/components/common/unauthorized';

export default function CategoryForm() {
  const { isAdmin, loadingAdmin } = useCurrentUser();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Error al crear categoría');
    }

    setLoading(false);
  };

  if (loadingAdmin) return null;
  if (!isAdmin) {
    return <Unauthorized />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Nueva Categoría</h1>
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
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
