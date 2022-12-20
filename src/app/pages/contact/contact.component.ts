import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { NotificationService } from "../../services_API/notification.service";
import { ConfigService } from "../../services_API/config.service";
import { VoucherService } from '../../services_API/voucher.service'
import { VoucherModel } from '../../models/voucher.model';
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatusNotification } from "../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { ActivatedRoute, Router, NavigationStart, Data } from '@angular/router';
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
  img = "assets/images/icons/bannerVoucher.jpg"
  isloading: boolean = false

  constructor(private voucherService: VoucherService, private notificationService: NotificationService,
    private router: Router,
    private configService: ConfigService) { }

    ngOnInit(): void {
      this.auth = JSON.parse(localStorage.getItem("currentUser"))

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
     if(this.auth){
      this.isloading = true
      this.voucherService.buy(voucher.idVoucher , this.auth.id ).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
            {
              this.resVoucher = Object.assign({}, new VoucherModel)
              this.isloading = false
            }
            }, error => {
              var message = this.configService.error(error.status, error.error != null?error.error.text:"");
              this.notificationService.handleAlert(message, StatusNotification.Error)
            })
     }
     else{
      this.router.navigate(['/login']);
      this.notificationService.handleAlert("Bạn cần phải đăng nhập !", StatusNotification.Warning)
     }

    }


}
