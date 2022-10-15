import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
      rememberMe: new FormControl('')
    })
  }
  login(){
    console.log(this.loginForm.value);
    var value = this.loginForm.value;
    var loginObj = {
      "userName": value.userName,
      "password": value.password
    }
    this.service.SignIn(loginObj).subscribe(resp=>{
      if(resp.succeeded){
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('userName', value.userName);
        localStorage.setItem('password', value.password);
        localStorage.setItem('rememberMe', value.rememberMe);

        this.router.navigate(['admin']);
      }
    })
  }
}
