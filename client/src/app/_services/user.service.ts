import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { UserPermission } from '@app/_models/permissions';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
        private authenticationService: AuthenticationService) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    getPermissions(id: number){
        return this.http.get<UserPermission>(`${environment.apiUrl}/api/permissions/${id}`);
    }
}