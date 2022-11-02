import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
@Injectable({
  providedIn: 'root'
})

export class ScheduleService{
constructor(private http:HttpClient, private configService:ConfigService){ }

async getsSchedule()
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-gets-schedule").toPromise();
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/create-schedule", data);
}

async getsSchedulebyIdSchedule(idSchedule: any)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/get-schedule?idSchedule="+idSchedule).toPromise();
}

async getsScheduleRelatebyIdSchedule(idSchedule: any)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/gets-schedule-relate?idSchedule="+idSchedule).toPromise();
}

async getsSchedulePromotion()
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/gets-schedule-promotion").toPromise();
}

async getsScheduleFlashSale()
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/gets-schedule-flash-sale").toPromise();
}

async getsSchedulebyIdTour(idTour: any)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-gets-schedule-idtour?idTour="+idTour).toPromise();
}

async searchSchedule(kw: any)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-search-schedule?"+kw).toPromise();
}
}
