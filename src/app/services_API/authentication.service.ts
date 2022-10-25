import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  login(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Authentication/login-customer", data);
  }

  logOut(cusId: string)
  {
      return  this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Authentication/logout-customer?idCus="+cusId);
  }

  changePassword(idCus: string, password: string, newPassword: string){
      return this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Authentication/change-pass-customer?idCus="+idCus+"&password="+password+"&newPassword="+newPassword);
  }


}
