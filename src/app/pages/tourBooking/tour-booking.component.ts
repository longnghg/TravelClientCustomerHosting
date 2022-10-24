import { Component, OnInit,  } from '@angular/core';
import { ScheduleModel } from "../../models/schedule.model";
import { TourBookingModel } from "../../models/tourBooking.model";
import { AuthenticationModel } from "../../models/authentication.model";
import { PaymentModel } from "../../models/payment.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { NotificationService } from "../../services_API/notification.service";
import { ConfigService } from "../../services_API/config.service";
import { TourBookingService } from "../../services_API/tourBooking.service";
import { PaymentService } from "../../services_API/payment.service";
import { ScheduleService } from "../../services_API/schedule.service";
import { ActivatedRoute } from '@angular/router';
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-tour-booking',
  templateUrl: './tour-booking.component.html',
  styleUrls: ['./tour-booking.component.scss']
})
export class TourBookingComponent implements OnInit {
  resTourBooking: TourBookingModel = new TourBookingModel
  resPayment: PaymentModel[]
  discountChild = 50
  priceChild: number = 0
  isCheck: boolean
  isPayment: boolean
  isCash: boolean = true
  isWallet: boolean
  isCard: boolean
  resSchedule: ScheduleModel
  resAthentication: AuthenticationModel
  listSchedule: ScheduleModel[]
  response: ResponseModel
  activePane = 0;
  isSuccess: boolean
  constructor(private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute, private paymentService: PaymentService, private notificationService: NotificationService, private configService: ConfigService, public tourBookingService: TourBookingService) {}
  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.resTourBooking = new TourBookingModel
    this.resTourBooking.scheduleId = this.activatedRoute.snapshot.paramMap.get('id1')
    this.resTourBooking.alias = this.activatedRoute.snapshot.paramMap.get('id2')
    this.init(this.resTourBooking.scheduleId)




  }
  init(idSchedule: string){
    this.scheduleService.getsSchedulebyIdSchedule(idSchedule).subscribe(res => {
      this.response = res
      this.resSchedule = this.response.content
      console.log(this.resSchedule);

      if(!this.response.notification.type)
      {
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

        if (this.resSchedule.alias != this.resTourBooking.alias) {
          location.assign(this.configService.clientUrl + "/#/page404")
        }
        console.log(this.resSchedule.tour.nameTour);

        this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
        if (this.resAthentication) {
          this.resTourBooking.nameContact = this.resAthentication.name
          this.resTourBooking.email = this.resAthentication.email
          this.resTourBooking.customerId = this.resAthentication.id
        }
          this.resTourBooking.tourName = this.resSchedule.tour.nameTour

        var tourBooking = localStorage.getItem("tourBooking_" + localStorage.getItem("idUser"))
        if (tourBooking) {
          this.resTourBooking = JSON.parse(tourBooking)
        }

        localStorage.setItem("tourBooking_" + this.resAthentication.id, JSON.stringify(this.resTourBooking))
      }
      else{
        location.assign(this.configService.clientUrl + "/#/page404")
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }
  onTabChange($event: number) {
    this.activePane = $event;
    if (this.activePane == 1) {
      this.paymentService.views().then(response => {
        this.resPayment = response
      })
    }
    // console.log('onTabChange', $event);
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
    localStorage.setItem("tourBooking_" + this.resAthentication.id, JSON.stringify(this.resTourBooking))
    return this.resTourBooking.adult + this.resTourBooking.child + this.resTourBooking.baby
  }

  totalPrice(){
    localStorage.setItem("tourBooking_" + this.resAthentication.id, JSON.stringify(this.resTourBooking))
    this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resSchedule.adultPrice) + (this.resTourBooking.child * this.resSchedule.childPrice) + (this.resTourBooking.baby * this.resSchedule.babyPrice)
    return this.resTourBooking.totalPrice

  }
  changePayment(type: any){
    localStorage.setItem("tourBooking_" + this.resAthentication.id, JSON.stringify(this.resTourBooking))
    this.resTourBooking.paymentId = type
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
       if (!this.isSuccess) {
        this.resTourBooking.scheduleId = this.resSchedule.idSchedule
        this.resTourBooking.pincode = "NDV",
        this.resTourBooking.hotelId = "34E417CF-CD67-4549-A84C-892CB1F28E0A"
        this.resTourBooking.restaurantId = "966e0b0e-ac69-4f35-95a1-bd4e8ff181d8"
        this.resTourBooking.placeId = "B10CF83D-485C-46AD-8C40-7C77C92FEC39"

        console.log(this.resTourBooking);

        this.tourBookingService.create(this.resTourBooking).subscribe(res => {
          console.log(res);

          this.response = res
          this.notificationService.handleAlertObj(this.response.notification)
          if (this.response.notification.type == "Success") {
            this.isSuccess = true
            localStorage.removeItem("tourBooking_" + this.resAthentication.id)
            location.assign(this.configService.clientUrl + "/#/bill/" + this.resTourBooking.scheduleId)
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
       }
       else{
        ///
       }
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
}
