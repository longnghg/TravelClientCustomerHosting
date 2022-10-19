import { Component, OnInit,  } from '@angular/core';
import { TourService } from "../../services_API/tour.service";
import { ScheduleModel } from "../../models/schedule.model";
import { TourBookingModel } from "../../models/tourBooking.model";
import { PaymentModel } from "../../models/payment.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { NotificationService } from "../../services_API/notification.service";
import { ConfigService } from "../../services_API/config.service";
import { TourookingService } from "../../services_API/tourBooking.service";
import { PaymentService } from "../../services_API/payment.service";
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  resTourBooking: TourBookingModel = new TourBookingModel
  resPayment: PaymentModel[]
  discountChild = 50
  priceAdult: number = 0
  isCheck: boolean
  isPayment: boolean
  isCash: boolean = true
  isMethodPayment: any = '1'
  isWallet: boolean
  isCard: boolean
  resSchedule: ScheduleModel
  response: ResponseModel
  activePane = 0;

  constructor(private tourService: TourService, private paymentService: PaymentService, private notificationService: NotificationService, private configService: ConfigService, public tourookingService: TourookingService) {

  }
  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.resSchedule = JSON.parse(sessionStorage.getItem("resShedule")!)
    this.priceAdult =  this.resSchedule.tour.priceAdultPromotion - (this.resSchedule.tour.priceAdultPromotion * this.discountChild / 100)
  }

  onTabChange($event: number) {
    this.activePane = $event;
    if (this.activePane == 1) {
      this.paymentService.views().then(response => {
        this.resPayment = response
      })
    }
    console.log('onTabChange', $event);
  }

  formatPrice(price: any){
    return price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
  }



  formatDate(date: any){
    return this.configService.formatFromUnixTimestampToFullDateView(date)
  }

  countBaby(type: string){
    if (type == "+") {
      if (this.totalPeople() == this.resSchedule.maxCapacity) {
        this.notificationService.handleAlert("Số khách tối đa " + this.resSchedule.maxCapacity + " !", "Warning")
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
      if (this.totalPeople() == this.resSchedule.maxCapacity) {
        this.notificationService.handleAlert("Số khách tối đa " + this.resSchedule.maxCapacity + " !", "Warning")
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
      if (this.totalPeople() == this.resSchedule.maxCapacity) {
        this.notificationService.handleAlert("Số khách tối đa " + this.resSchedule.maxCapacity + " !", "Warning")
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
    this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resSchedule.tour.priceAdultPromotion) + (this.resTourBooking.child * this.priceAdult) + (this.resTourBooking.baby * 0)
    return this.resTourBooking.totalPrice
  }
  changePayment(type: any){
    this.isMethodPayment = type
  }
  booking(){
    if (!this.isCheck) {
      this.resTourBooking.nameCustomer = this.resTourBooking.nameContact
    }
    var valid =  this.configService.validateInfoCustomer(this.resTourBooking, this.isCheck)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      if (this.isPayment) {

        this.resTourBooking.scheduleId = this.resSchedule.idSchedule
        this.resTourBooking.paymentId = 1,
        this.resTourBooking.pincode = "NDV",
        this.resTourBooking.hotelId = "34E417CF-CD67-4549-A84C-892CB1F28E0A"
        this.resTourBooking.restaurantId = "966E0B0E-AC69-4F35-95A1-BD4E8FF181D8"
        this.resTourBooking.placeId = "B10CF83D-485C-46AD-8C40-7C77C92FEC39"
        this.tourookingService.create(this.resTourBooking).subscribe(res => {
          this.response = res
          this.notificationService.handleAlertObj(this.response.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      else{
        document.body.scrollTop = 100;
        document.documentElement.scrollTop = 100;
        this.activePane = 1
      }
    }
  }
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    this.resTourBooking.phone = input.value
  }



  //Làm điều khoản
}
