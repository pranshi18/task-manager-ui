import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }

  loginUrl = "http://ec2-13-232-183-111.ap-south-1.compute.amazonaws.com:8080/login"
  signUpUrl = "http://ec2-13-232-183-111.ap-south-1.compute.amazonaws.com:8080/register"

  
  loginUser(username : any, password : any) : Observable<any> {

      const req = {
        username : username,
        password : password
      }

      return this.http.post(this.loginUrl, req);
  }

  signUpUser(req : any) : Observable<any>{
    return this.http.post(this.signUpUrl, req);
  }

  storeToken(token : string){
    localStorage.setItem('authToken', token);
  }

  getToken(){
    return localStorage.getItem('authToken');
  }

  logout(){
    localStorage.removeItem('authToken');
  }

  isLoggedIn(){
    return this.getToken()!=null;
  }
}
