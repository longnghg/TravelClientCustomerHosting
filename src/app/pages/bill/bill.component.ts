import { Component, OnInit } from '@angular/core';
import { TourBookingModel} from "../../models/tourBooking.model";
import { StatusBooking} from "../../enums/enum";
import { ScheduleModel } from "../../models/schedule.model";
import { ConfigService } from "../../services_API/config.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  resTourBooking: TourBookingModel
  resSchedule: ScheduleModel
  priceChild: number
  discountChild: number = 50

  constructor(private activatedRoute: ActivatedRoute, private configService: ConfigService) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.resSchedule = JSON.parse(sessionStorage.getItem("resSchedule"))
    this.resTourBooking = JSON.parse(sessionStorage.getItem("resTourBooking"))
    console.log(this.resTourBooking);
    if (this.resSchedule.finalPriceHoliday == 0) {
      this.resSchedule.adultPrice = this.resSchedule.finalPrice
      this.resSchedule.childPrice = this.resSchedule.finalPrice - (this.resSchedule.finalPrice * 50 / 100)
      this.resSchedule.babyPrice = 0
    }
    else{
      this.resSchedule.adultPrice = this.resSchedule.finalPriceHoliday
      this.resSchedule.childPrice = this.resSchedule.finalPriceHoliday - (this.resSchedule.finalPriceHoliday * 50 / 100)
      this.resSchedule.babyPrice = 0
    }

    if (this.resTourBooking) {
      if (this.resTourBooking.scheduleId != this.activatedRoute.snapshot.paramMap.get('id')) {
        location.assign(this.configService.clientUrl + "/#/page404")
      }
    }
    else{
      location.assign(this.configService.clientUrl + "/#/page404")
    }
  }


  formatPrice(price: any){
    return price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
  }



  formatDate(date: any){
    return this.configService.formatFromUnixTimestampToFullDateView(date)
  }

  formatDateTime(date: any){
    return this.configService.formatFromUnixTimestampToFullDateTimeView(date)
  }

  totalPeople(){
    return this.resTourBooking.adult + this.resTourBooking.child + this.resTourBooking.baby
  }

  totalPrice(){
    this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resSchedule.adultPrice) + (this.resTourBooking.child * this.resSchedule.childPrice) + (this.resTourBooking.baby * this.resSchedule.babyPrice)
    return this.resTourBooking.totalPrice
  }

  formatStatus(status: any){
    return StatusBooking[status]
  }
}
