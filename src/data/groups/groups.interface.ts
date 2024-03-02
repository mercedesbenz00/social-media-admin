import type { ICategory } from "../categories/categories.interface";
import type { IMediaFile } from "../main.interface";

export interface IGroup {
  id: number;
  name: string;
  description: string;
  rules?: string;
  postTypeAllowed?: string[]
  avatarPlaceholder?: boolean
  avatarLoaded?: boolean
  avatarUrl?: string
  coverPlaceholder?: boolean
  coverLoaded?: boolean
  coverUrl?: string
  categories?: ICategory[]
  ownerId?: number;
  member?: boolean;
  stats?: {
    id: number;
    membersCount: number;
    publishedPostsCount: number;
    score: number;
  }
  accessType?: "PRIVATE" | "PUBLIC";
  postingPermission?: "ALL" | "WITH_APPROVAL" | "ADMIN_ONLY";
  avatar?: IMediaFile;
  cover?: IMediaFile;
  state?: "APPROVED" | "PENDING" | "REJECTED"
}