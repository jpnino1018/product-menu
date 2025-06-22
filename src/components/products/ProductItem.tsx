'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string | null;
};

export function ProductItem({ product }: { product: Product }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm(`¿Eliminar "${product.name}"?`);
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${product.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert('Error al eliminar producto');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-muted-foreground">${product.price.toLocaleString('es-CO')}</p>
      </CardHeader>
      <CardContent>
        {product.image && (
          <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={handleDelete}>
          Eliminar
        </Button>
        <Link href={`/edit/${product.id}`}>
          <Button variant="outline">Editar</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
