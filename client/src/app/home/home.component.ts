import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    show = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
            console.log(this.users);
        });
    }

    showDetails(id: number){
        const index = this.users.findIndex(user => user.id === id);
        this.users[index].state = !this.users[index].state;
        if (this.users[index].permission) {
            return;
        }
        
        this.users[index].loading = !this.users[index].loading;
        this.userService.getPermissions(id).pipe(first()).subscribe(permission => {
            this.users[index].loading = !this.users[index].loading;
            this.users[index].permission = permission;
            console.log(this.users[index]);
        });
    }
}