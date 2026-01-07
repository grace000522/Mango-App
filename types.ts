
export enum DischargeStatus {
  PENDING = '대기중',
  COLLECTING = '수거중',
  COMPLETED = '완료',
  CANCELLED = '취소됨'
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
