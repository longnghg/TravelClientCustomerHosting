import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class BannerService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

    UploadBanner(data: any)
  {
      return this.http.post<ResponseModel>(this.configService.apiUrl + "/api/news/UploadBanner",data);
  }

  gets()
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/news/list-banner")
  }
}
