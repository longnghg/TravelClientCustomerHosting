import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { CarModel } from "../models/car.model";
import { NotificationService } from "../services_API/notification.service";
@Injectable({
  providedIn: 'root'
})

export class CarService{
constructor(private http:HttpClient, private configService:ConfigService,private notificationService: NotificationService){ }
response: ResponseModel
resCar: CarModel[]
async views()
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/gets-car").subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resCar =  this.response.content
        resolve(this.resCar);
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
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/gets-car");
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Car/create-car", data);
}

}
