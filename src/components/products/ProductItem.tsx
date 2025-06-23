'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

export function ProductItem({
  product,
}: {
  product: {
    id: number;
    name: string;
    price: number;
    image?: string | null;
  };
}) {
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
    <Card className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
      {/* Info del producto */}
      <div className="flex-1 w-full">
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="text-muted-foreground mb-2">
          ${product.price.toLocaleString('es-CO')}
        </p>
      </div>

      {/* Imagen */}
      {product.image && (
        <div className="relative w-32 h-32 flex-shrink-0 border rounded overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}

      {/* Dropdown de acciones */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/edit/${product.id}`}>
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleDelete} className="text-red-600">
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
