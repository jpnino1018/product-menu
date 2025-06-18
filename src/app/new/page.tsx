// src/app/new/page.tsx
import ProductForm from '@/components/products/ProductForm';

export default function NewProductPage() {
  
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuevo Producto</h1>
      <ProductForm />
    </main>
  );
}
