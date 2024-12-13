import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // username : string = '';
  // password : string = '';
  // emailId : string = '';

  loginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    // emailId : new FormControl('', Validators.required)
  });

  errorLogin : boolean = false;

  constructor(private userService : UserServiceService, private router : Router){}

  login(){

    this.userService.loginUser(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value).subscribe(res => {
      console.log("Login Successful");
      this.userService.storeToken(res.token);
      this.router.navigateByUrl("/task-list");
    }, 
    (err) => {
      this.errorLogin = true;
      console.log("Incorrect username/password", err);
    })

  }

}
