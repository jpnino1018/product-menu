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
import { useCurrentUser } from '@/hooks/UseCurrentUser';
import { getPublicUrl } from '@/lib/supabase/storage';

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
  const { isAdmin, loadingAdmin } = useCurrentUser();

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
    <Card className="relative w-full max-w-xs mx-auto shadow-md border rounded-lg overflow-hidden">
      {/* Imagen principal */}
      {product.image && (
        <div className="relative w-full h-48">
          <Image
            src={getPublicUrl(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
            className="object-contain"
          />
        </div>
      )}

      {/* Info del producto */}
      <CardContent className="p-4 text-center">
        <p className="text-md font-semibold mb-1">{product.name}</p>
        <p className="text-muted-foreground text-sm">
          ${product.price.toLocaleString('es-CO')}
        </p>
      </CardContent>

      {/* Dropdown admin */}
      {!loadingAdmin && isAdmin && (
        <div className="absolute top-2 right-2 z-10">
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
        </div>
      )}
    </Card>
  );
}
