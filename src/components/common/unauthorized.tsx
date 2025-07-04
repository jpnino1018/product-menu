'use client';

import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Acceso no autorizado</h2>
      <p className="mb-6 text-muted-foreground">
        No tienes permiso para ver esta página.
      </p>
      <Link href="/">
        <span className="text-blue-600 hover:underline">Volver al inicio</span>
      </Link>
    </div>
  );
}
