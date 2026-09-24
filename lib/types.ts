// Shared types — used by the consultation form API, the admin panel and the
// database query layer, so all three agree on the same shape.

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string;
  practiceArea: string;
  consultMode: string;
  preferredDate?: string; // YYYY-MM-DD
  preferredTime?: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type ContactMessageInput = {
  name: string;
  email: string;
  phone: string;
  practiceArea: string;
  consultMode: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
};
