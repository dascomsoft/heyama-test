// components/objects/ObjectForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ObjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      console.error('Erreur upload:', error);
      setUploading(false);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          alert("Erreur lors de l'upload de l'image");
          setLoading(false);
          return;
        }
      }

      const response = await fetch(`${API_URL}/objects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          imageUrl: imageUrl,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        router.push(`/objects/${result.data._id}`);
        router.refresh();
      } else {
        alert('Erreur lors de la création');
      }
    } catch (error) {
      alert('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Créer un nouvel objet</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Titre</label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={loading || uploading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading || uploading}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">Image</label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading || uploading}
            />
            
            {uploading && <p className="text-sm text-blue-500">Upload en cours...</p>}
            
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Aperçu :</p>
                <img src={preview} alt="Aperçu" className="max-w-full h-48 object-cover rounded-md border" />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button  className='bg-slate-900 p-3 text-white'   type="button"  onClick={() => router.back()} disabled={loading || uploading}>
            Annuler
          </Button>
          <Button className='bg-slate-900 p-3 text-white' type="submit" disabled={loading || uploading}>
            {loading || uploading ? 'Traitement...' : 'Créer'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}