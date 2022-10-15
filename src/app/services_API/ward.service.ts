import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { LocationModel } from "../models/location.model";
import { NotificationService } from "../services_API/notification.service";
@Injectable({
    providedIn: 'root'
})

export class WardService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }
  response: ResponseModel
  resWard: LocationModel[]

  async views()
  {
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Location/gets-ward").subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resWard =  this.response.content
          resolve(this.resWard);
        }
        else{
          this.notificationService.handleAlertObj(res.notification)
        }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })})
    return value
  }
  gets()
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Location/gets-ward");
  }

  search(data){
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/search-ward", data);
  }

  create(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/create-ward", data);
  }

  update(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/update-ward", data);
  }

  delete(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/delete-ward", data);
  }
}
