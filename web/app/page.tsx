'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Object } from '@/lib/types';
import ObjectList from '@/components/objects/ObjectList';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const [objects, setObjects] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/objects`)
      .then(res => res.json())
      .then(response => {
        if (response.success && Array.isArray(response.data)) {
          setObjects(response.data);
        } else {
          setObjects([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setObjects([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Objets</h1>
        <Link href="/create">
          <Button className='bg-slate-900 p-3 text-white'>Créer un objet</Button>
        </Link>
      </div>
      <ObjectList objects={objects} />
    </div>
  );
}