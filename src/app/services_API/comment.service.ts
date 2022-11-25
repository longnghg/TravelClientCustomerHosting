import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { CommentModel } from "../models/comment.model";
import { NotificationService } from "../services_API/notification.service";
@Injectable({
    providedIn: 'root'
})

export class CommentService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }

  response: ResponseModel
  resComment: CommentModel []

  gets(idTour: string)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Comment/gets-comment?idTour=" + idTour);
  }
  getidCus(idCus: string)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Comment/gets-comment?idCus=" + idCus);
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/comment/create-comment", data);
  }

  delete(idComment: string, idCustomer:string)
  {
    return this.http.delete<ResponseModel>(this.configService.apiUrl + "/api/comment/delete-comment?idComment="+idComment+"&idCustomer="+idCustomer);
  }


}
