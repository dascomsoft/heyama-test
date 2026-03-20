 // mobile/lib/api.ts
import { API_URL } from '@env';

export interface Object {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export const objectApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/objects`);
    return await res.json();
  },

  getOne: async (id: string) => {
    const res = await fetch(`${API_URL}/objects/${id}`);
    return await res.json();
  },

  create: async (data: { title: string; description: string; imageUrl?: string }) => {
    const res = await fetch(`${API_URL}/objects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  delete: async (id: string) => {
    console.log('DELETE appel pour id:', id);
    const res = await fetch(`${API_URL}/objects/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log('Réponse DELETE:', data);
    return data;
  },
};