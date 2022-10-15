import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ToastrService } from 'ngx-toastr';
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
        else
        {
            this.toastr.error(messenge, 'Lỗi');
        }

    }
}
