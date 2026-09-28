import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MLIVRETRABALHO | Operação',
  description: 'Console empresarial complementar do MLIVRETRABALHO',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
