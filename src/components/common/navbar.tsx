// src/components/ui/Navbar.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';
import { ThemeToggle } from '../util/theme-toggle';

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background shadow-sm">
      <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
        Mercastillo Licores
      </Link>

      <div>
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
      <ThemeToggle />
      </div>
    </header>
  );
}
