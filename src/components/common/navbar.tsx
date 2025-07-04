'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';
import { ThemeToggle } from '../util/theme-toggle';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/UseCurrentUser';

export function Navbar() {
  const { isAdmin, loadingAdmin } = useCurrentUser();

  // 🛡️ Espera a que cargue el usuario para evitar hydration mismatch
  if (loadingAdmin) return null;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-navbar shadow-sm">
      <Link
        href="/"
        className="text-xl font-bold text-navbar-foreground hover:text-primary transition-colors"
      >
        <Image
          src="/mercastillosf.png"
          alt="Logo Mercastillo"
          width={150}
          height={40}
          priority
        />
      </Link>

      <div className="flex items-center gap-2">
        {isAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/new">Agregar producto</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/categories/new">Agregar categoría</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/brands/new">Agregar marca</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
