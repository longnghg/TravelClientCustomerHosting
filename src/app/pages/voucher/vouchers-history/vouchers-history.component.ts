import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { VoucherService } from '../../../services_API/voucher.service'
import { VoucherModel } from '../../../models/voucher.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-vouchers-history',
  templateUrl: './vouchers-history.component.html',
  styleUrls: ['./vouchers-history.component.scss']
})
export class VouchersHistoryComponent implements OnInit {
  resVouchers: VoucherModel[]
  response: ResponseModel
  isDelete: boolean = false
  resVoucher: VoucherModel
  auth: AuthenticationModel  = new AuthenticationModel
  pageCount: number = 1
  pageSize: number = 6
  index: number = 0
  pageNumber: number = 1
  start: number = 0
  end: number = 0
  btnPrev: boolean = false
  btnNext: boolean = true
  totalResult: number
  totalVoucher: any
  imgVoucher = "assets/images/icons/voucher.PNG"
  constructor(private voucherService: VoucherService, private notificationService: NotificationService,

    private configService: ConfigService, private router:Router) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.init(this.auth.id)
  }
  dateChange(property: any) {
    // this.resVoucher.endDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resVoucher.endDate)
    // this.resVoucher.startDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resVoucher.startDate)
    // this.resVoucher[property] = new Date(this.resVoucher[property+"Display"]).getTime()
  }
  init(idCustomer: any){
    this.voucherService.getsHistory(idCustomer).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resVouchers = this.response.content
        this.totalVoucher = this.resVouchers.length
        this.calTotalResult()
        this.calStartEnd()
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  selectPage(page: string, type: string) {
    var index = parseInt(page)
    if (type == 'prev' && index > 1) {
      this.pageNumber = index - 1
    }
    else if(type == 'next' && index < this.pageCount){
      this.pageNumber = index + 1
    }
    else if(type == 'nextAll'){
      this.pageNumber = this.pageCount
    }
    else if (type == 'prevAll') {
      this.pageNumber = 1
    }
    else{
      if (index > this.pageCount) {
        this.pageNumber = this.pageCount
      }
      else if (index == 0){
        this.pageNumber = 1
      }
      else{
        this.pageNumber = index
      }
    }

    if (this.pageNumber == 1) {
      this.btnPrev = false
    }
    else{
      this.btnPrev = true
    }

    if (this.pageNumber == this.pageCount) {
      this.btnNext = false
    }
    else{
      this.btnNext = true
    }

    this.calTotalResult()
    this.calStartEnd()
  }


  calStartEnd(){
    this.start = ((this.pageNumber - 1) * this.pageSize) + 1
    this.end = this.start + this.pageSize - 1
  }
  calTotalResult(){
    if (this.resVouchers) {
      for (let index = 0; index < this.resVouchers.length; index++) {
        this.resVouchers[index].rowNum = index+1
      }

      this.totalResult = this.resVouchers.length
      if(this.totalResult % this.pageSize == 0){
        this.pageCount = this.totalResult / this.pageSize
      }
      else{
        this.pageCount = Math.floor(this.totalResult / this.pageSize + 1)
      }

      if (this.pageCount == 1) {
         this.btnNext = false
      }
      else{
        this.btnNext = true
      }
      this.index = (this.pageNumber - 1) * this.pageSize
    }
  }
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  apllyVoucher(){
    var kw = "from=" + '' + "&to=" + '' + "&departureDate=" + '' + "&returnDate=" + ''
    this.router.navigate(['', 'tour', kw]);
  }
}
