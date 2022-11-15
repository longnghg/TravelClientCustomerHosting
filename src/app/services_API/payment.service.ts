import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { PaymentModel } from "../models/payment.model";
import { NotificationService } from "../services_API/notification.service";
@Injectable({
  providedIn: 'root'
})

export class PaymentService{
constructor(private http:HttpClient, private configService:ConfigService,private notificationService: NotificationService){ }
response: ResponseModel
resPayment: PaymentModel[]
async views()
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Payment/list-payment").subscribe(res => {
      this.response = res
      this.resPayment =  this.response.content
      resolve(this.resPayment);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}
gets()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Payment/list-payment");
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Payment/create-payment", data);
}

}
