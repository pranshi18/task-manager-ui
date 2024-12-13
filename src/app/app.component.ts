import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager-app-copy';

  constructor(private userService : UserServiceService, private router : Router){}
  
  isLoggedIn(){
    return this.userService.isLoggedIn();
  }

  isSignUpRoute(): boolean {
    return this.router.url === '/signup';
  }
}
