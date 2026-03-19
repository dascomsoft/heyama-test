// app/create/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ObjectForm from '@/components/objects/ObjectForm';

export default function CreatePage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline">← Retour</Button>
        </Link>
        <h1 className="text-2xl font-bold">Créer un objet</h1>
      </div>
      <ObjectForm />
    </div>
  );
}