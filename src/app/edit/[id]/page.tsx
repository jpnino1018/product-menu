import ProductForm from '@/components/products/ProductForm';
import { prisma } from '@/lib/prisma';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return <p>ID inválido</p>;
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <ProductForm initialData={product} isEdit />
    </main>
  );
}
