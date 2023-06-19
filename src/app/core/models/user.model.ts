export type UserRole = 'ADMIN' | 'USER'

export interface UserListItem {
    userId: string,

    userName: string,

    email: string,

    userRoles: UserRole[]
}

export interface User {
    id: string,

    userName: string,

    normalizedUserName: string,

    email: string,

    normalizedEmail: string,

    refreshToken: string,

    userRoles: UserRole[]
}