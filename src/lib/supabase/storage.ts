import { supabase } from './supabase';

export async function uploadImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(`products/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error al subir imagen:', error.message);
    return null;
  }

  return data?.path || null;
}

export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImage(path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from('product-images')
    .remove([path]);

  if (error) {
    console.error('Error al eliminar imagen:', error);
    return false;
  }

  return true;
}
