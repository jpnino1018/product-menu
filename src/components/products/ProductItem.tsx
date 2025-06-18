'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function ProductItem({ product }: { product: { id: number; name: string; price: number; image?: string | null } }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm(`¿Eliminar "${product.name}"?`);
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${product.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.refresh(); // recarga sin salir de la página
    } else {
      alert('Error al eliminar producto');
    }
  };

  return (
    <li className="border p-4 rounded">
      <p className="font-semibold">{product.name}</p>
      <p>${product.price.toLocaleString('es-CO')}</p>
      {product.image && (
        <img src={product.image} alt={product.name} className="w-24 mt-2" />
      )}
      <button onClick={handleDelete} className="text-red-600 hover:underline mt-2">
        Eliminar
      </button>
      <Link href={`/edit/${product.id}`} className="text-blue-500 hover:underline mb-4 inline-block">
        Editar
      </Link>
    </li>
  );
}
