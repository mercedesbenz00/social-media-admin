export interface ITokenResponse {
  token: string
  refreshToken: string
  expireTime: number
}

export interface IUserAvatar {
  id: number
  fileType: string
  path: string
  mimeType: string
  ownerId: number
  size: number
  createdAt: number
}

export interface IAuthUser {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  gender?: string
  birthDate?: string
  roles: string[]
  authorities: any[]
  displayName: string
  cityId: number
  deletedDate?: any
  followerCount: number
  followingCount: number
  postCount: number
  groupCount: number
  interestCount: number
  isVerifiedAccount?: boolean
  cover?: any
  avatar?: IUserAvatar
  admin: boolean
  isRegistrationCompleted: boolean
  isBlocked?: boolean
  isMuted?: boolean
}

export interface IUserAvatar {
  id: number
  fileType: string
  path: string
  mimeType: string
  ownerId: number
  size: number
  createdAt: number
}
