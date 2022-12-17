import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})

export class NewsService{
constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }

response: ResponseModel

translateLanguage(cmtText: any, fromLang: any, toLang: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/news/translate-language?input="+cmtText+"&fromLang="+fromLang+"&toLang="+toLang);
  }

mapLocation(locationString: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/news/map-location?locationString="+locationString);
  }

}
