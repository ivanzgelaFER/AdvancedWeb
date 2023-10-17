export interface UserData {
    guid?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    roles?: UserRole[];
    token?: string;
}

export enum UserRole {
    Admin = "Admin",
    User = "User",
}