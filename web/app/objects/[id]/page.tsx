'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Object } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ObjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [object, setObject] = useState<Object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === 'undefined') {
      router.push('/');
      return;
    }

    fetch(`${API_URL}/objects/${id}`)
      .then(res => res.json())
      .then(response => {
        if (response.success && response.data) {
          setObject(response.data);
        } else {
          setObject(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setObject(null);
        setLoading(false);
      });
  }, [id, router]);

  const handleDelete = async () => {
    if (confirm('Supprimer cet objet ?')) {
      try {
        await fetch(`${API_URL}/objects/${id}`, {
          method: 'DELETE',
        });
        router.push('/');
        router.refresh();
      } catch (error) {
        console.error('Erreur suppression:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Chargement...</div>;
  }

  if (!object) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Objet non trouvé</p>
        <Link href="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline">← Retour</Button>
        </Link>
        <h1 className="text-2xl font-bold">Détail de l'objet</h1>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{object.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {object.imageUrl ? (
            <img src={object.imageUrl} alt={object.title} className="w-full h-96 object-cover rounded-lg" />
          ) : (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Pas d'image</span>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{object.description}</p>
          </div>

          <div className="text-sm text-gray-400">
            Créé le {new Date(object.createdAt).toLocaleDateString()}
          </div>

          <div className="pt-4 flex justify-end">
            <Button className='bg-slate-900 p-3 text-white' variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}