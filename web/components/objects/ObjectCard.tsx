// components/objects/ObjectCard.tsx
'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ObjectFromAPI {
  _id: string;        
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  __v?: number;
}

interface Props {
  object: ObjectFromAPI;
}

export default function ObjectCard({ object }: Props) {
  // Vérifie que l'objet existe
  if (!object) return null;

  const objectId = object._id;

  console.log('Objet reçu:', object); // Pour debug
  console.log('ID utilisé:', objectId);

  return (
    <Link href={`/objects/${objectId}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <CardTitle className="text-lg">{object.title || 'Sans titre'}</CardTitle>
        </CardHeader>
        <CardContent>
          {object.imageUrl ? (
            <img 
              src={object.imageUrl} 
              alt={object.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center mb-2">
              <span className="text-gray-400">Pas d'image</span>
            </div>
          )}
          <p className="text-gray-600 line-clamp-2">{object.description || ''}</p>
        </CardContent>
        <CardFooter className="text-sm text-gray-400">
          {object.createdAt ? new Date(object.createdAt).toLocaleDateString() : 'Date inconnue'}
        </CardFooter>
      </Card>
    </Link>
  );
}