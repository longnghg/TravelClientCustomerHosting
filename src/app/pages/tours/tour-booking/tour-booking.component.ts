import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { StatusNotification, PaymentMethod } from "../../../enums/enum";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { VoucherModel } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services_API/voucher.service';

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-tour-booking',
  templateUrl: './tour-booking.component.html',
  styleUrls: ['./tour-booking.component.scss']
})
export class TourBookingComponent implements OnInit {
  public readonly siteKey = '6Lc_K-YiAAAAANf7vCWU19G-psPfDiWFgV-r6RTc';
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
  @ViewChild('recapchaModal') recapchaModal: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('goto') goto: ElementRef;
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
  paypal: {
    status: number,
    url: string,
    debugId: string
  }
  isRecapcha: boolean
  resVouchers: VoucherModel[]
  resVoucher:VoucherModel
  idCustomer: string
  totalPriceNotVoucher: number
  totalPriceVoucher: number
  protected aFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private scheduleService: ScheduleService, private router: Router, private activatedRoute: ActivatedRoute, private paymentService: PaymentService, private notificationService: NotificationService, private configService: ConfigService, public tourBookingService: TourBookingService, private voucherService: VoucherService) {}
  url = this.configService.apiUrl
  ngOnInit() {
    this.idCustomer = localStorage.getItem("idUser")
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });

    this.resTourBooking.scheduleId = this.activatedRoute.snapshot.paramMap.get('id1')
    this.resTourBooking.alias = this.activatedRoute.snapshot.paramMap.get('id2')

    this.init(this.resTourBooking.scheduleId)
    this.initVoucher(this.idCustomer)
  }
  init(idSchedule: string){
    this.scheduleService.getsSchedulebyIdSchedule(idSchedule).then(res => {
      this.response = res
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
          location.assign(this.configService.clientUrl + "/page404")
        }
        var tourBooking = localStorage.getItem("tourBooking_" + localStorage.getItem("idUser"))
        if (tourBooking) {
          this.resTourBooking = JSON.parse(tourBooking)
        }
        this.resTourBooking.tourName = this.resSchedule.tour.nameTour
        this.setCart()
      }
      else{
        location.assign(this.configService.clientUrl + "/page404")
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initVoucher(idCustomer: any){
    this.voucherService.views(idCustomer).then(response => {
      this.resVouchers = response
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
        if(this.resVoucher){
          this.totalPriceNotVoucher = this.resTourBooking.totalPrice
          this.resTourBooking.totalPrice = this.totalPriceNotVoucher * ((100 - this.resVoucher.value)/100)
        }
      }
    }

    this.setCart()
    return this.resTourBooking.totalPrice
  }
  changePayment(type: any){
    this.setCart()
    this.resTourBooking.paymentId = Number(type)
  }

  booking(){
    if (!this.isCheck) {
      this.resTourBooking.nameCustomer = this.resTourBooking.nameContact
    }
    this.validateTourBooking =  this.configService.validateInfoCustomer(this.resTourBooking, this.validateTourBooking, this.isCheck)
    if ( this.validateTourBooking.total == 0) {
      if (this.isPayment) {
       if (!this.isSuccess) {
        this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
        if (this.resAthentication) {
          this.recapchaModal.nativeElement.click()
        }
        else{
          // this.notificationService.handleAlert("Bạn cần phải đăng nhập !", StatusNotification.Info)
          // sessionStorage.setItem("wait","/tour-booking/"+this.activatedRoute.snapshot.paramMap.get('id1')+"/"+this.activatedRoute.snapshot.paramMap.get('id2'))
          // document.body.scrollTop = 0;
          // document.documentElement.scrollTop = 0;
          // setTimeout(() => {
          //   this.router.navigate(["", "login"], { state: { reload: true } })
          // }, 1000);
          this.goto.nativeElement.click()
        }
       }
      }
      else{
        document.body.scrollTop = 100;
        document.documentElement.scrollTop = 100;
        this.activePane = 1
      }
    }
    else{
      document.body.scrollTop = 100;
        document.documentElement.scrollTop = 100;
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
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
    if (this.resAthentication) {
      this.resTourBooking.nameContact = this.resAthentication.name
      this.resTourBooking.email = this.resAthentication.email
      this.resTourBooking.customerId = this.resAthentication.id
      this.resTourBooking.phone = this.resAthentication.phone
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.notificationService.handleAlert("Liên kết tài khoản thành công !", StatusNotification.Info)
    }
    else{
      this.goto.nativeElement.click()
    }
  }


  handleError(){
    this.isRecapcha = false
    this.notificationService.handleAlert('Lỗi capcha !', StatusNotification.Error)
  }

  handleSuccess(e: any){
    if (e) {
      this.isRecapcha = true
    }
  }

  finalBooking(){
    document.body.style.overflow = "hidden"
    document.getElementById("fade-load").setAttribute("class","fade-load")
    document.getElementById("bg-load").style.display = "block"

    this.resTourBooking.scheduleId = this.resSchedule.idSchedule
    // this.resTourBooking.pincode = "TRB" + new Date().getTime()
    if (this.resSchedule.costTour) {
      this.resTourBooking.hotelId = this.resSchedule.costTour.hotelId
      this.resTourBooking.restaurantId = this.resSchedule.costTour.restaurantId
      this.resTourBooking.placeId = this.resSchedule.costTour.placeId
    }

    if(this.resVoucher){
      this.resTourBooking.voucherCode = this.resVoucher.code
    }

    this.tourBookingService.create(this.resTourBooking).then(res => {
      this.response = res
      this.notificationService.handleAlertObj(this.response.notification)
      if (this.response.notification.type == StatusNotification.Success) {
        this.resTourBooking.idTourBooking = this.response.content
        if (this.resTourBooking.paymentId == PaymentMethod.Paypal) {
          this.tourBookingService.paypal(this.resTourBooking.idTourBooking).then(res => {
            this.paypal = res
            if (!res.debugId) {
              setTimeout(() => {
                document.body.removeAttribute("style")
                document.getElementById("fade-load").removeAttribute("class")
                document.getElementById("bg-load").removeAttribute("style")
                location.assign(this.paypal.url)
              }, 5000);
            }
            else{
              document.body.removeAttribute("style")
              document.getElementById("fade-load").removeAttribute("class")
              document.getElementById("bg-load").removeAttribute("style")
               this.notificationService.handleAlert("Hệ thống thanh toán đang có vấn đề, xin vui lòng thử lại sau !", StatusNotification.Error)
            }

          })
        }
        else{
          setTimeout(() => {
            document.body.removeAttribute("style")
            document.getElementById("fade-load").removeAttribute("class")
            document.getElementById("bg-load").removeAttribute("style")
            this.router.navigate(['','bill', this.resTourBooking.idTourBooking]);
            this.isSuccess = true
            this.resTourBooking = new TourBookingModel
            this.isRecapcha = false
            this.closeModal.nativeElement.click()
          }, 5000);
        }
      }
      else{
        document.body.removeAttribute("style")
        document.getElementById("fade-load").removeAttribute("class")
        document.getElementById("bg-load").removeAttribute("style")
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
      this.captchaElem.resetCaptcha();
    }, error => {
      document.body.removeAttribute("style")
      document.getElementById("fade-load").removeAttribute("class")
      document.getElementById("bg-load").removeAttribute("style")
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
      this.captchaElem.resetCaptcha();
    })
  }

  closeRecapchaModal(){
    this.captchaElem.resetCaptcha();
    this.isRecapcha = false
  }

  gotoLogin(){
    sessionStorage.setItem("wait","/tour-booking/"+this.activatedRoute.snapshot.paramMap.get('id1')+"/"+this.activatedRoute.snapshot.paramMap.get('id2'))
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.router.navigate(["", "login"], { state: { reload: true } })
  }


  applyVoucher(voucher: any){
    this.resVoucher = voucher
    console.log(this.resVoucher);

    setTimeout(() => {
      this.closeModal.nativeElement.click()
    }, 100);
  }

  deleteVoucher(){
    this.resVoucher = null
  }
}
