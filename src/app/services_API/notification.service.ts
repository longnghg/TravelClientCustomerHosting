import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from "../models/responsiveModels/response.model";
@Injectable({
    providedIn: 'root'
})


export class NotificationService{
    constructor(private http:HttpClient, private configService:ConfigService, private toastr: ToastrService){ }
    // alertByToken()
    // {
    //     var token = localStorage.getItem("token")
    //     return this.http.post(this.configService.apiUrl + "/api/Notification/Alert", {token});
    // }

    // alert()
    // {
    //     return this.http.get(this.configService.apiUrl + "/api/Notification/Alert");
    // }

    handleAlertObj(data: any){

        if(data.type === 'Success')
        {
            this.toastr.success(data.messenge, 'Thông báo');
        }
        else if(data.type === 'Warning')
        {
            this.toastr.warning(data.messenge, 'Cảnh báo');
        }
        else
        {
            this.toastr.error(data.messenge, 'Lỗi');
        }

    }

    handleAlert(messenge: string, type: string){
        if(type === 'Success')
        {
            this.toastr.success(messenge, 'Thông báo');
        }
        else if( type === 'Warning')
        {
            this.toastr.warning(messenge, 'Cảnh báo');
        }
        else if( type === 'Info')
        {
            this.toastr.info(messenge, 'Thông báo');
        }
        else
        {
            this.toastr.error(messenge, 'Lỗi');
        }

    }

    async reply(data: any)
    {
      return await this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Chat/create-messenger", data).toPromise();
    }

    async view(Idcustomer: string)
    {
      return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Chat/cus-messenger?idCustomer="+Idcustomer).toPromise();
    }

    async updateIsSeenMess(idCus: string, idSp: string)
    {
      return await this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Chat/check-seen-messenger-cus?idCus="+idCus+"&idSp="+idSp, {}).toPromise();
    }
}
