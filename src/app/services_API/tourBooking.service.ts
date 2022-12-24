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
    return this.http.get<ResponseModel>( this.configService.apiTourBookingUrl + "/api/TourBooking/list-tourbooking");
  }

  getsHistory(idCustomer: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/customer/list-history-booking-bycustomer?idCustomer="+ idCustomer);
  }

  getTourBooking(idTourBooking: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiTourBookingUrl + "/api/TourBooking/tour-booking-by-id?idTourBooking="+ idTourBooking);
  }

  async create(data: any)
  {
    return await this.http.post<ResponseModel>( this.configService.apiTourBookingUrl + "/api/TourBooking/create-tourBooking", data).toPromise();
  }

  async cancel(idTourBooking: any)
  {
    return await this.http.put<ResponseModel>( this.configService.apiTourBookingUrl + "/api/TourBooking/cancel-booking?idTourBooking="+ idTourBooking, {}).toPromise();
  }

  async paypal(idTourBooking: string, idCustomer: string){
    return await this.http.get<any>( this.configService.apiTourBookingUrl + "/api/Pay/checkout-paypal?idTourBooking="+idTourBooking+"&idCustomer="+idCustomer).toPromise();;
  }

  async vnpay(idTourBooking: string, idCustomer: string){
    return await this.http.get<any>( this.configService.apiTourBookingUrl + "/api/Pay/checkout-vnpay?idTourBooking="+idTourBooking+"&idCustomer="+idCustomer).toPromise();;
  }

  cusSearchBookingNo(bookingNo: string){
    return this.http.get<ResponseModel>( this.configService.apiTourBookingUrl + "/api/TourBooking/cus-search-bookingNo?bookingNo="+ bookingNo);
  }

  changePayment(idTourBooking: string, idPayment: number)
{
  return this.http.get<boolean>( this.configService.apiTourBookingUrl + "/api/TourBooking/payment-changed?idTourBooking="+idTourBooking+"&idPayment="+idPayment).toPromise();
}
}
