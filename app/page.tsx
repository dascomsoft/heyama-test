// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Object } from '@/lib/types';
import ObjectList from '@/components/objects/ObjectList';

export default function HomePage() {
  const [objects, setObjects] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de données en attendant l'API
    const mockObjects: Object[] = [
      {
        id: '1',
        title: 'Chaise design',
        description: 'Une belle chaise en bois massif',
        imageUrl: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Lampe vintage',
        description: 'Lampe des années 50 en parfait état',
        imageUrl: null,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    setTimeout(() => {
      setObjects(mockObjects);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Objets</h1>
        <Link href="/create">
          <Button>Créer un objet</Button>
        </Link>
      </div>
      <ObjectList objects={objects} />
    </div>
  );
}