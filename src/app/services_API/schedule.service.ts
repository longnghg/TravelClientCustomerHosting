import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
@Injectable({
  providedIn: 'root'
})

export class ScheduleService{
constructor(private http:HttpClient, private configService:ConfigService){ }

async getsSchedule(pageIndex: number, pageSize: number)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-list-schedule?pageIndex="+pageIndex+"&pageSize="+pageSize).toPromise();
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/create-schedule", data);
}

async getsSchedulebyIdSchedule(idSchedule: any)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/detail-schedule?idSchedule="+idSchedule).toPromise();
}

async getsScheduleRelatebyIdSchedule(idSchedule: any, pageIndex: number, pageSize: number)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/list-schedule-relate?idSchedule="+idSchedule+"&pageIndex="+pageIndex+"&pageSize="+pageSize).toPromise();
}

async getsSchedulePromotion(pageIndex: number, pageSize: number)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/list-schedule-promotion?pageIndex="+pageIndex+"&pageSize="+pageSize).toPromise();
}

async getsScheduleFlashSale(pageIndex: number, pageSize: number)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/list-schedule-flash-sale?pageIndex="+pageIndex+"&pageSize="+pageSize).toPromise();
}

async getsSchedulebyIdTour(idTour: any)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-list-schedule-idtour?idTour="+idTour).toPromise();
}

async searchSchedule(kw: any)
{
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-search-schedule?"+kw).toPromise();
}

async searchSheduleFilter(data: any){
    return await this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-search-schedule-filter", data).toPromise();
}

async weather(location: string)
  {
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/News/weather-forecast?location="+location).toPromise();
  }
}
