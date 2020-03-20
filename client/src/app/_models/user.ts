import { UserPermission } from './permissions';

export class User {
    id: number;
    nameFirst: string;
    nameLast: string;
    email: string;
    avatar: string;
    company: string;
    token?: string;
    permission?: UserPermission
    state: boolean = false;
    loading: boolean = false;
}