import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    emailId : new FormControl('', [Validators.required, Validators.email])
  });

  signUpSuccessful : boolean = false;
  userExists : boolean = false;

  constructor(private userService : UserServiceService, private router : Router){
    console.log("here")
  }

  signUp(){ 

    const req = {
      username : this.signUpForm.get("username")?.value,
      password : this.signUpForm.get("password")?.value,
      email : this.signUpForm.get("emailId")?.value
    }
    this.userService.signUpUser(req).subscribe(res => {
      console.log("Sign up successful");
      this.signUpSuccessful = true;
      this.signUpForm.reset();
      // this.router.navigateByUrl("/login");
    }, 
    (err)=> {
      this.signUpSuccessful = false;
      if(err.error.message=="Username already exists")
        this.userExists = true;
      console.log("Please try again later", err);
    })
  }
}
