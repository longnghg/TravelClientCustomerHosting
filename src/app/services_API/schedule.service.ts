import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
@Injectable({
  providedIn: 'root'
})

export class ScheduleService{
constructor(private http:HttpClient, private configService:ConfigService){ }

gets()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/gets-schedule");
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/create-schedule", data);
}


getsSchedulebyIdSchedule(idSchedule: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/get-schedule?idSchedule="+idSchedule);
}

getsSchedulebyIdTour(idTour: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-gets-schedule-idtour?idTour="+idTour);
}

searchSchedule(kw: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/cus-search-schedule?"+kw);
}
}
