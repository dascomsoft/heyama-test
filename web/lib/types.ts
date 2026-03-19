// lib/types.ts
export interface Object {
  _id: string;        // MongoDB utilise _id
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface CreateObjectData {
  title: string;
  description: string;
  image?: File;
}

export interface ApiResponse {
  success: boolean;
  data?: Object | Object[];
  message?: string;
}