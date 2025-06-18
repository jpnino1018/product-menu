import CategoryForm from '@/components/categories/CategoryForm';

export default function NewCategoryPage() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nueva Categoría</h1>
      <CategoryForm />
    </main>
  );
}
