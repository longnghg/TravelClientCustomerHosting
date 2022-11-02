import { Component, OnInit,  } from '@angular/core';
import { ScheduleModel } from "../../../models/schedule.model";
import { TourBookingModel, ValidationTourBookingModel } from "../../../models/tourBooking.model";
import { AuthenticationModel } from "../../../models/authentication.model";
import { PaymentModel } from "../../../models/payment.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { TourBookingService } from "../../../services_API/tourBooking.service";
import { PaymentService } from "../../../services_API/payment.service";
import { ScheduleService } from "../../../services_API/schedule.service";
import { ActivatedRoute, Router } from '@angular/router';
import { StatusNotification } from "../../../enums/enum";

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-tour-booking',
  templateUrl: './tour-booking.component.html',
  styleUrls: ['./tour-booking.component.scss']
})
export class TourBookingComponent implements OnInit {
  validateTourBooking: ValidationTourBookingModel = new ValidationTourBookingModel
  resTourBooking: TourBookingModel = new TourBookingModel
  resAthentication: AuthenticationModel
  resPayment: PaymentModel[]
  discountChild = 50
  priceChild: number = 0
  isCheck: boolean
  isPayment: boolean
  isCash: boolean = true
  isWallet: boolean
  isCard: boolean
  resSchedule: ScheduleModel
  listSchedule: ScheduleModel[]
  response: ResponseModel
  activePane = 0;
  isSuccess: boolean
  constructor(private scheduleService: ScheduleService, private router: Router, private activatedRoute: ActivatedRoute, private paymentService: PaymentService, private notificationService: NotificationService, private configService: ConfigService, public tourBookingService: TourBookingService) {}
  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.resTourBooking.scheduleId = this.activatedRoute.snapshot.paramMap.get('id1')
    this.resTourBooking.alias = this.activatedRoute.snapshot.paramMap.get('id2')

    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))

    this.init(this.resTourBooking.scheduleId)
  }
  init(idSchedule: string){
    this.scheduleService.getsSchedulebyIdSchedule(idSchedule).then(res => {
      this.response = res
      console.log(res);

      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resSchedule = this.response.content
        if (this.resSchedule) {
          if (this.resSchedule.promotions.idPromotion != 1) {
            if (this.resSchedule.isHoliday) {
              this.resSchedule.priceAdultPromotion = this.resSchedule.priceAdultHoliday - (this.resSchedule.priceAdultHoliday * this.resSchedule.promotions.value /100)
              this.resSchedule.priceChildPromotion = this.resSchedule.priceChildHoliday - (this.resSchedule.priceChildHoliday * this.resSchedule.promotions.value /100)
              this.resSchedule.priceBabyPromotion = this.resSchedule.priceBabyHoliday - (this.resSchedule.priceBabyHoliday * this.resSchedule.promotions.value /100)
            }
            else{
              this.resSchedule.priceAdultPromotion = this.resSchedule.priceAdult - (this.resSchedule.priceAdult * this.resSchedule.promotions.value /100)
              this.resSchedule.priceChildPromotion = this.resSchedule.priceChild - (this.resSchedule.priceChild * this.resSchedule.promotions.value /100)
              this.resSchedule.priceBabyPromotion = this.resSchedule.priceBaby - (this.resSchedule.priceBaby * this.resSchedule.promotions.value /100)
            }
          }
        }

        if (this.resSchedule.alias != this.resTourBooking.alias) {
          location.assign(this.configService.clientUrl + "/#/page404")
        }
        var tourBooking = localStorage.getItem("tourBooking_" + localStorage.getItem("idUser"))
        if (tourBooking) {
          this.resTourBooking = JSON.parse(tourBooking)
        }
        this.resTourBooking.tourName = this.resSchedule.tour.nameTour
        this.setCart()
      }
      else{
        location.assign(this.configService.clientUrl + "/#/page404")
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
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


  countBaby(type: string){
    if (type == "+") {
      if (this.totalPeople() >= (this.resSchedule.maxCapacity-this.resSchedule.quantityCustomer)) {
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
      if (this.totalPeople() >= (this.resSchedule.maxCapacity-this.resSchedule.quantityCustomer)) {
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
      if (this.totalPeople() >= (this.resSchedule.maxCapacity-this.resSchedule.quantityCustomer)) {
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
    this.setCart()
    return this.resTourBooking.adult + this.resTourBooking.child + this.resTourBooking.baby
  }

  totalPrice(){
    if (this.resSchedule.promotions.idPromotion != 1) {
      this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resSchedule.priceAdultPromotion) + (this.resTourBooking.child * this.resSchedule.priceChildPromotion) + (this.resTourBooking.baby * this.resSchedule.priceBabyPromotion)
    }
    else{
      if (this.resSchedule.isHoliday) {
        this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resSchedule.priceAdultHoliday) + (this.resTourBooking.child * this.resSchedule.priceChildHoliday) + (this.resTourBooking.baby * this.resSchedule.priceBabyHoliday)
      }
      else{
        this.resTourBooking.totalPrice = (this.resTourBooking.adult * this.resSchedule.priceAdult) + (this.resTourBooking.child * this.resSchedule.priceChild) + (this.resTourBooking.baby * this.resSchedule.priceBaby)
      }
    }

    this.setCart()
    return this.resTourBooking.totalPrice
  }
  changePayment(type: any){
    this.setCart()
    this.resTourBooking.paymentId = type
  }

  booking(){
    if (!this.isCheck) {
      this.resTourBooking.nameCustomer = this.resTourBooking.nameContact
    }
    this.validateTourBooking =  this.configService.validateInfoCustomer(this.resTourBooking, this.validateTourBooking, this.isCheck)
    if ( this.validateTourBooking.total == 0) {
      if (this.isPayment) {
       if (!this.isSuccess) {
        this.resTourBooking.scheduleId = this.resSchedule.idSchedule
        this.resTourBooking.pincode = "TRB" + new Date().getTime(),
        this.resTourBooking.hotelId = this.resSchedule.costTour.hotelId
        this.resTourBooking.restaurantId = this.resSchedule.costTour.restaurantId
        this.resTourBooking.placeId = this.resSchedule.costTour.placeId
        this.tourBookingService.create(this.resTourBooking).then(res => {
          this.response = res
          this.notificationService.handleAlertObj(this.response.notification)
          if (this.response.notification.type == StatusNotification.Success) {
            this.isSuccess = true
            this.resTourBooking = new TourBookingModel
            location.assign(this.configService.clientUrl + "/#/bill/" + this.response.content)
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
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

  setCart(){
    if (this.resAthentication) {
      localStorage.setItem("tourBooking_" + this.resAthentication.id, JSON.stringify(this.resTourBooking))
    }
    else{
      localStorage.setItem("tourBooking_null", JSON.stringify(this.resTourBooking))
    }
  }

  link(){
    if (this.resAthentication) {
      this.resTourBooking.nameContact = this.resAthentication.name
      this.resTourBooking.email = this.resAthentication.email
      this.resTourBooking.customerId = this.resAthentication.id
    }
    else{
      location.assign(this.configService.clientUrl + "/#/login")
    }
  }
}
