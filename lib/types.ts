// lib/types.ts
export interface Object {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

export interface CreateObjectData {
  title: string;
  description: string;
  image?: File;
}