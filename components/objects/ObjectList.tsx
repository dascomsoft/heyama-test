// components/objects/ObjectList.tsx
'use client';

import { Object } from '@/lib/types';
import ObjectCard from './ObjectCard';

interface Props {
  objects: Object[];
}

export default function ObjectList({ objects }: Props) {
  if (objects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Aucun objet pour le moment</p>
        <a 
          href="/create" 
          className="text-blue-500 hover:underline"
        >
          Créer le premier objet
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {objects.map((object) => (
        <ObjectCard key={object.id} object={object} />
      ))}
    </div>
  );
}