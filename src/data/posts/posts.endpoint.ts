import type { IEndpoints } from "../main.interface";

export const ePosts: IEndpoints = {
  getReasons: {
    url: '/post-service/api/v1/posts/complaints/reasons',
    method: 'get',
  },
}