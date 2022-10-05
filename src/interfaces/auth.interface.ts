import { Request } from 'express';
import { Acronym } from '@/interfaces/acronym.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: Acronym;
}
