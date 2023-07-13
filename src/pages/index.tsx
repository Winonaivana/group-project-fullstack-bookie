import { signOut } from 'next-auth/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="block">
      <h1>Home</h1>
      <button
        className="p-2 rounded-md bg-gray-400"
        onClick={() => signOut({ callbackUrl: '/login' })}
      >
        Sign out
      </button>
    </main>
  );
}
