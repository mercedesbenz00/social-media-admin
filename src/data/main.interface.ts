export interface IRequest {
  url: string
  method?: string
  headers?: { [key: string]: string }
  isFormData?: boolean
  body?: any
  params?: any
}

export interface IEndpoints {
  [key: string]: IRequest
}

export interface IToast {
  message: string
  type?: 'success' | 'error' | 'info' | 'warn'
  sticky?: boolean
  life?: number
  detail?: string
  closable?: boolean
  group?: string
  class?: string
  contentClass?: string
}

export interface IPopupMenuItem {
  title: string,
  class?: string,
  action: Function
}

export interface IConfirm {
  message: string,
  header: string,
  icon?: string,
  accept: Function,
  reject: Function,
  acceptLabel: string,
  rejectLabel: string
}

export interface IPerson {
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

export interface IMediaFile {
  id: number
  path: string
  fileType: string
  mimeType: string
  owner: IPerson
  size: number
}