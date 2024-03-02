import type { IUserAvatar } from "../auth/auth.interface";

export interface ICategory {
  id: number;
  categoryUUID: string;
  avatar?: IUserAvatar;
  cover?: any;
  createdAt: number;
  groupCount: number;
  name: string;
  parentCategory: any;
  personCount: number; 
}