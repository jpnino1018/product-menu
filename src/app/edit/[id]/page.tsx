// src/app/edit/[id]/page.tsx
import ProductForm from '@/components/products/ProductForm';
import { prisma } from '@/lib/prisma';

type EditProductPageProps = {
  params: { id: string };
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) {
    return <div className="p-6">Producto no encontrado</div>;
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <ProductForm initialData={product} isEdit />
    </main>
  );
}
