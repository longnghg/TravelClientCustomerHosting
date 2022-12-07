import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class TimelineService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  getTimelineidSchedule(idSchedule: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Timeline/list-timeline-idSchedule?idSchedule="+idSchedule);
  }

}
