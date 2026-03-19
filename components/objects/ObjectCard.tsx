// components/objects/ObjectCard.tsx
'use client';

import { Object } from '@/lib/types';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  object: Object;
}

export default function ObjectCard({ object }: Props) {
  return (
    <Link href={`/objects/${object.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">{object.title}</CardTitle>
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
          <p className="text-gray-600 line-clamp-2">{object.description}</p>
        </CardContent>
        <CardFooter className="text-sm text-gray-400">
          {new Date(object.createdAt).toLocaleDateString()}
        </CardFooter>
      </Card>
    </Link>
  );
}