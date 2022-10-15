import { Component, OnInit,  } from '@angular/core';
import { TourService } from "../../services_API/tour.service";
import { TourModel } from "../../models/tour.model";
import { TourBookingModel } from "../../models/tourBooking.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { NotificationService } from "../../services_API/notification.service";
import { ConfigService } from "../../services_API/config.service";
import { TourookingService } from "../../services_API/tourBooking.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  resTourBooking: TourBookingModel = new TourBookingModel
  discountChild = 50
  priceAdult: number = 0
  subscription: Subscription;
  isCheck: boolean
  resTour: TourModel
  response: ResponseModel
  constructor(private tourService: TourService, private notificationService: NotificationService, private configService: ConfigService, public tourookingService: TourookingService) {

  }
  ngOnInit() {
    document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    this.resTour = JSON.parse(sessionStorage.getItem("resTour")!)
    this.priceAdult =  this.resTour.priceAdultPromotion - (this.resTour.priceAdultPromotion * this.discountChild / 100)
  }

  formatPrice(price: any){
    return price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
  }



  formatDate(date: any){
    return this.configService.formatFromUnixTimestampToFullDateView(date)
  }

  countBaby(type: string){
    if (type == "+") {
      if (this.totalPeople() == this.resTour.schedules[this.resTour.schedules.length-1].maxCapacity) {
        this.notificationService.handleAlert("Số khách tối đa " + this.resTour.schedules[this.resTour.schedules.length-1].maxCapacity + " !", "Warning")
      }
      else {
        this.resTourBooking.baby += 1
      }
    }
    else {
      if (this.resTourBooking.baby > 0) {
        this.resTourBooking.baby -= 1
      }
    }
  }

  countAdult(type: string){
    if (type == "+") {
      if (this.totalPeople() == this.resTour.schedules[this.resTour.schedules.length-1].maxCapacity) {
        this.notificationService.handleAlert("Số khách tối đa " + this.resTour.schedules[this.resTour.schedules.length-1].maxCapacity + " !", "Warning")
      }
      else {
        this.resTourBooking.adult += 1
      }

    }
    else {
      if (this.resTourBooking.adult == 1) {
       this.notificationService.handleAlert("Số khách yêu cầu tối thiểu 1 !", "Warning")
      }
      else{
        this.resTourBooking.adult -= 1
      }
    }
  }

  countChild(type: string){
    if (type == "+") {
      if (this.totalPeople() == this.resTour.schedules[this.resTour.schedules.length-1].maxCapacity) {
        this.notificationService.handleAlert("Số khách tối đa " + this.resTour.schedules[this.resTour.schedules.length-1].maxCapacity + " !", "Warning")
      }
      else {
        this.resTourBooking.child += 1
      }
    }
    else {
      if (this.resTourBooking.child > 0) {
        this.resTourBooking.child -= 1
      }
    }
  }

  totalPeople(){
    return this.resTourBooking.adult + this.resTourBooking.child + this.resTourBooking.baby
  }

  totalPrice(){
    this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resTour.priceAdultPromotion) + (this.resTourBooking.child * this.priceAdult) + (this.resTourBooking.baby * 0)
    return this.resTourBooking.totalPrice
  }

  booking(){
    if (!this.isCheck) {
      this.resTourBooking.nameCustomer = this.resTourBooking.nameContact
    }
    this.resTourBooking.scheduleId = this.resTour.schedules[this.resTour.schedules.length-1].idSchedule
    this.resTourBooking.paymentId = 1,
    this.resTourBooking.pincode = "NDV",
    this.resTourBooking.hotelId = "34E417CF-CD67-4549-A84C-892CB1F28E0A"
    this.resTourBooking.restaurantId = "966E0B0E-AC69-4F35-95A1-BD4E8FF181D8"
    this.resTourBooking.placeId = "B10CF83D-485C-46AD-8C40-7C77C92FEC39"
    console.log(this.resTourBooking);

    this.tourookingService.create(this.resTourBooking).subscribe(res => {
      this.response = res
      this.notificationService.handleAlertObj(this.response.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }
}
