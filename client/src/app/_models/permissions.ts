export class UserPermission {
    role: string;
    permission: Permission;
}

export class Permission {
    manageSuperUsers: boolean;
    manageUsers: boolean;
    billing: boolean;
    editDocuments: boolean;
}