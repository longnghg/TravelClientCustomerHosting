import { Component, OnInit } from '@angular/core';
import { TourBookingModel} from "../../models/tourBooking.model";
import { StatusBooking} from "../../enums/enum";
import { ScheduleModel } from "../../models/schedule.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { ConfigService } from "../../services_API/config.service";
import { ScheduleService } from "../../services_API/schedule.service";
import { TourBookingService } from "../../services_API/tourBooking.service";
import { NotificationService } from "../../services_API/notification.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  response: ResponseModel
  resTourBooking: TourBookingModel
  resSchedule: ScheduleModel

  constructor(private tourBookingService: TourBookingService,private notificationService: NotificationService, private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute, private configService: ConfigService) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    var idTourBooking = this.activatedRoute.snapshot.paramMap.get('id')
    this.init(idTourBooking)
  }

  init(idTourBooking: string){
    this.tourBookingService.getTourBooking(idTourBooking).subscribe(res => {
      this.response = res
      console.log(res);

      if (this.response.notification.type == "Error") {
        location.assign(this.configService.clientUrl + "/#/page404")
      }
      else{
        this.resTourBooking = this.response.content
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
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
    if (this.resSchedule.isHoliday) {
      this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resSchedule.priceAdult) + (this.resTourBooking.child * this.resSchedule.priceChild) + (this.resTourBooking.baby * this.resSchedule.priceBaby)
    }
    else{
      this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resSchedule.priceAdultHoliday) + (this.resTourBooking.child * this.resSchedule.priceChildHoliday) + (this.resTourBooking.baby * this.resSchedule.priceBabyHoliday)
    }
    return this.resTourBooking.totalPrice
  }

  formatStatus(status: any){
    return StatusBooking[status]
  }
}
