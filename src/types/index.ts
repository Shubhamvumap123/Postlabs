export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Job {
  _id: string;
  userId: string;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  location?: string;
  createdAt: string;
  updatedAt: string;
}
