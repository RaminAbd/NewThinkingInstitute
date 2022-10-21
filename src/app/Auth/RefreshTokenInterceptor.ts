import { Injectable, Injector } from '@angular/core';
import {throwError as observableThrowError, Observable, catchError} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './Auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private authService: AuthService,private router:Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        var rememberMe = localStorage.getItem('rememberMe') ==='true' ? true : false;
        if(errorResponse.status===401 && errorResponse.statusText==='Unauthorized'){
          localStorage.setItem('token',"");
          var userName = localStorage.getItem('userName') as string;
          var password = localStorage.getItem('password') as string;
          var loginObj = {
            "userName": userName,
            "password": password
          }
          var rememberMe = localStorage.getItem('rememberMe') ==='true' ? true : false;
          if(rememberMe === true){
            this.authService.SignIn(loginObj).subscribe(data=>{this.router.navigate(['admin']) })
          }
          else{
            this.router.navigate(['/login'])
          }
        }

        return observableThrowError(errorResponse);
      })

    );
  }
}
