import { AppThemeProvider } from '@/components/util/theme-provider';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/common/navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Inventario de Licores',
  description: 'Sistema de gestión de productos de licor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="max-w-screen p-6">{children}</main>
        </AppThemeProvider>
      </body>
    </html>
  );
}
