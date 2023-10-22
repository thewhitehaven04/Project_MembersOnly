interface ICredentials {
  username: string
  password: string
}

export interface IUserData {
  name: string
  lastName: string
  isMember: boolean
  isAdmin: boolean
}

export interface IUser {
  credentials: ICredentials
  data: IUserData
}
