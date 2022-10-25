import { Component, OnInit } from '@angular/core';
import { TourBookingHistoryModel } from "../../models/tourBookingHistory.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatusBooking } from "../../enums/enum";
import { TourBookingService } from "../../services_API/tourBooking.service";
import { ConfigService } from "../../services_API/config.service";
import { NotificationService } from "../../services_API/notification.service";
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-bills-history',
  templateUrl: './bills-history.component.html',
  styleUrls: ['./bills-history.component.scss']
})
export class BillsHistoryComponent implements OnInit {
  response: ResponseModel
  totalResult: number
  pageCount: number = 1
  pageSize: number = 3
  index: number = 0
  pageNumber: number = 1
  start: number = 0
  end: number = 0
  btnPrev: boolean = false
  btnNext: boolean = true

  resTourBookingHistory: TourBookingHistoryModel[]
  constructor(private notificationService: NotificationService, private configService: ConfigService, private tourBookingService: TourBookingService) { }

  ngOnInit(): void {
    this.init()
  }

  init(){
    var idCustomer = localStorage.getItem("idUser")
    this.tourBookingService.getsHistory(idCustomer).subscribe(res => {
      this.response = res
      console.log(res);

      if(!this.response.notification.type)
      {
        this.resTourBookingHistory = this.response.content

        if (this.resTourBookingHistory) {
          this.resTourBookingHistory.forEach(tourBookingHistory => {
            tourBookingHistory.totalPeople = tourBookingHistory.adult + tourBookingHistory.child + tourBookingHistory.baby

            tourBookingHistory.statusName = StatusBooking[tourBookingHistory.status]
          });
        }
        this.calTotalResult()
        this.calStartEnd()
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  billDetail(idTourBooking: string){
    console.log(idTourBooking);

    location.assign(this.configService.clientUrl + "/#/bill/" + idTourBooking)
  }

  formatPrice(price: any){
    return price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
  }


  formatDate(date: any){
    return this.configService.formatFromUnixTimestampToFullDateView(date)
  }



  calStartEnd(){
    this.start = ((this.pageNumber - 1) * this.pageSize) + 1
    this.end = this.start + this.pageSize - 1
  }
  calTotalResult(){
    if (this.resTourBookingHistory) {
      for (let index = 0; index < this.resTourBookingHistory.length; index++) {
        this.resTourBookingHistory[index].rowNum = index+1
      }

      this.totalResult = this.resTourBookingHistory.length
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

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
