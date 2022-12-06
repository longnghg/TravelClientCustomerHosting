import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { ImageModel } from "../models/image.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})

export class ImageService{
constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }

response: ResponseModel

getsbyidTour(idTour: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/image/list-image-idTour?idTour="+idTour);
  }

}