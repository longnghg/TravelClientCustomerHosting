import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
  providedIn: 'root'
})

export class TourBookingService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  gets()
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/get-tourbooking");
  }

   getsHistory(idCustomer: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/customer/gets-history-booking-bycustomer?idCustomer="+ idCustomer);
  }

  getTourBooking(idTourBooking: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/tour-booking-by-id?idTourBooking="+ idTourBooking);
  }

  async create(data: any)
  {
    return await this.http.post<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/create-tourBooking", data).toPromise();
  }

  async cancel(idTourBooking: any)
  {
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/cancel-booking?idTourBooking="+ idTourBooking).toPromise();
  }

  async paypal(idTourBooking: string){
    return await this.http.get<any>( this.configService.apiUrl + "/api/pay/checkout-paypal?idTourBooking="+idTourBooking).toPromise();;
  }
}
