'use client';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

export default function Home() {
  return (
    <main>
      <div>
        <Header />
        <Sidebar />
      </div>
    </main>
  );
}
