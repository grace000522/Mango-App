
export enum DischargeStatus {
  PENDING = 'Pending',
  COLLECTING = 'Collecting',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface DischargeRequest {
  id: string;
  itemType: string;
  description: string;
  imageUrl?: string;
  status: DischargeStatus;
  createdAt: string;
  location: string;
  pointsAwarded?: number;
}

export interface UserProfile {
  name: string;
  points: number;
  totalDischarges: number;
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Mango';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
