import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { NotificationService } from "../../services_API/notification.service";
import { ConfigService } from "../../services_API/config.service";
import { VoucherService } from '../../services_API/voucher.service'
import { VoucherModel } from '../../models/voucher.model';
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatusNotification } from "../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  resVouchers: VoucherModel[]
  response: ResponseModel
  isDelete: boolean = false
  resVoucher: VoucherModel
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel  = new AuthenticationModel
  data: any


  constructor(private voucherService: VoucherService, private notificationService: NotificationService,

    private configService: ConfigService) { }

    ngOnInit(): void {
      this.auth = JSON.parse(localStorage.getItem("currentUser"))
      console.log(this.auth);

      this.init()
    }
    dateChange(property: any) {
      // this.resVoucher.endDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resVoucher.endDate)
      // this.resVoucher.startDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resVoucher.startDate)
      // this.resVoucher[property] = new Date(this.resVoucher[property+"Display"]).getTime()
    }
    init(){
      this.voucherService.gets().subscribe(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){
          this.resVouchers = this.response.content

          console.log(this.resVouchers);

        }
        else{
          this.resVouchers = null
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }

    buyVoucher(voucher :VoucherModel){

      this.voucherService.buy(voucher.idVoucher , this.auth.id ).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
            {
              this.resVoucher = Object.assign({}, new VoucherModel)

            }
            }, error => {
              var message = this.configService.error(error.status, error.error != null?error.error.text:"");
              this.notificationService.handleAlert(message, StatusNotification.Error)
            })
    }


}
