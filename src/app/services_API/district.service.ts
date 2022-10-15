import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { LocationModel } from "../models/location.model";
import { NotificationService } from "../services_API/notification.service";
@Injectable({
    providedIn: 'root'
})

export class DistrictService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }
  response: ResponseModel
  resDistrict: LocationModel[]

  async views()
  {
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Location/gets-district").subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resDistrict =  this.response.content
          resolve(this.resDistrict);
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
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Location/gets-district");
  }

  search(data){
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/search-district", data);
  }

  create(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/create-district", data);
  }

  update(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/update-district", data);
  }

  delete(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/delete-district", data);
  }
}
