export type TokenStatus = 'waiting' | 'serving' | 'completed' | 'cancelled';

export interface Token {
  id: string;
  number: number;
  name: string;
  phone?: string;
  serviceType: string;
  status: TokenStatus;
  createdAt: Date;
  servedAt?: Date;
  completedAt?: Date;
}

export interface QueueState {
  tokens: Token[];
  currentNumber: number;
}
