import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
  providedIn: 'root'
})

export class BannerService {
  constructor(private http: HttpClient, private configService: ConfigService) { }

  GetBannerAll() {
    return this.http.get<ResponseModel>(this.configService.apiUrl + "/api/news/gets-banner-all");
  }
}
