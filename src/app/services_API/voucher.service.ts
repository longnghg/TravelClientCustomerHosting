import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { VoucherModel } from "../models/voucher.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})
export class VoucherService{
  constructor(private http:HttpClient, private configService:ConfigService,private notificationService: NotificationService){ }
  response: ResponseModel
  resCar: VoucherModel[]

  gets()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Voucher/list-voucher");
}



buy(idVoucher: any , idCus : any )
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Voucher/voucher-tiket?idVoucher="+idVoucher+"&idCus="+idCus, {});
}
getsHistory(idCustomer: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Voucher/vouchers-history?idCustomer="+idCustomer);
}

}

