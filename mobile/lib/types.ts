// lib/types.ts
export interface Object {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface CreateObjectData {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: Object | Object[];
  message?: string;
}