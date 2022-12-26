import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from "./config.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private inject : Injector, private configService : ConfigService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     var token = "";
    let authReq = req;
    if (req.url.includes("Customer") || req.url.includes("TourBooking") || req.url.includes("Pay")) {
      token = localStorage.getItem('token');
      // console.error(req);
      // console.error(token);
    }
    else{
      token = localStorage.getItem('tokenDefault');
      // console.warn(req);
      // console.warn(token);
    }

    authReq = this.AddTokenHeader(req,token);

    return next.handle(authReq).pipe(
      catchError(errorData =>{
        if(errorData.status === 401){
            return this.HandleRefreshToken(req,next);
        }
        return throwError(errorData);
      })
    );


    // if (!token) {
    //   return next.handle(req);
    // }

    // const req1 = req.clone({
    //   headers: req.headers.set('Authorization', `Bearer ${token}`),
    // });

    // return next.handle(req1);
  }
  HandleRefreshToken(request: HttpRequest<any>, next: HttpHandler){
    const token = localStorage.getItem("token"); // you probably want to store it in localStorage or something
    const refToken = localStorage.getItem("refreshToken");
    let input = {
      "accessToken": token,
  "refreshToken": refToken
    };
    let authService = this.inject.get(AuthenticationService);
    return  ( authService.generateRefreshToken(input)).pipe(
      switchMap((data:any) => {

        if(data.success){
          var tokenNew= data.data.token;
          var refTokenNew = data.data.refToken;
        this.SaveToken(tokenNew,refTokenNew);
          return next.handle(this.AddTokenHeader(request,data.data.token))
        }
        return null;
      })
    )


  }
  AddTokenHeader(request: HttpRequest<any>,token:any){
    return request.clone({headers:request.headers.set('Authorization', `Bearer ${token}`)})
  }
  logout(){
    sessionStorage.clear()
  }
  // RefreshToken(token:string, refToken:string){
  //   let input = {
  //     "accessToken": token,
  //     "refreshToken": refToken
  //   }

  //   this.authenticationService.generateRefreshToken(input).then(res =>{
  //     console.log(res);

  //   })
  // }
  SaveToken(token: string, refToken: string){

      localStorage.setItem("refreshToken",refToken);

      localStorage.setItem('token',token);

  }

}
