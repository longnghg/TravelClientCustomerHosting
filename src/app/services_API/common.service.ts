import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
@Injectable({
  providedIn: 'root'
})

export class CommonService{
constructor(private http:HttpClient, private configService:ConfigService){ }

// async getsWeather()
// {
//     return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-list-schedule?pageIndex="+pageIndex+"&pageSize="+pageSize).toPromise();
// }

// async getsSchedulebyIdSchedule(idSchedule: any)
// {
//     return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/detail-schedule?idSchedule="+idSchedule).toPromise();
// }
}