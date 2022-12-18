import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { TokenModel } from "../models/tokenModel.model";
import { AuthenticationModel } from "../models/authentication.model";
@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{
  constructor(private http:HttpClient, private configService:ConfigService){ }
  login(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Authentication/login-customer", data);
  }

  loginDefault(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Authentication/login-employee", data);
  }

  logOut(cusId: string)
  {
      return  this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Authentication/logout-customer?idCus="+cusId);
  }

  changePassword(idCus: string, password: string, newPassword: string){
      return this.http.put<ResponseModel>(this.configService.apiUrl + "/api/Authentication/change-pass-customer?idCus="+idCus+"&password="+password+"&newPassword="+newPassword, {});
  }

  forgotPassword(data: any){
    return this.http.put<ResponseModel>(this.configService.apiUrl + "/api/Authentication/forgot-pass-customer?email="+data.email+"&password="+data.password, {});
}

  block(email: string){
    return this.http.put<ResponseModel>(this.configService.apiUrl + "/api/Authentication/block-customer?email="+email, {});
  }

  generateRefreshToken(data:any){
    return  this.http.post(this.configService.apiUrl + "/api/Authentication/refresh-token",data);
  }

  generateTokenGuess(){
    return  this.http.get<AuthenticationModel>(this.configService.apiUrl + "/api/Authentication/token-guess");
}

}
