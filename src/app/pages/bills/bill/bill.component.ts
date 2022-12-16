import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TourBookingModel} from "../../../models/tourBooking.model";
import { StatusBooking} from "../../../enums/enum";
import { ScheduleModel } from "../../../models/schedule.model";
import { PaymentModel } from "../../../models/payment.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ConfigService } from "../../../services_API/config.service";
import { ScheduleService } from "../../../services_API/schedule.service";
import { TourBookingService } from "../../../services_API/tourBooking.service";
import { NotificationService } from "../../../services_API/notification.service";
import { PaymentService } from "../../../services_API/payment.service";
import { ActivatedRoute } from '@angular/router';
import { AuthenticationModel } from "../../../models/authentication.model";
import { StatusNotification } from "../../../enums/enum";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  public readonly siteKey = '6Lc_K-YiAAAAANf7vCWU19G-psPfDiWFgV-r6RTc';
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
  response: ResponseModel
  resTourBooking: TourBookingModel
  resSchedule: ScheduleModel
  resPayment: PaymentModel[]
  resAthentication: AuthenticationModel
  public myAngularxQrCode: string = null;
  @ViewChild('cancelTour') cancelTour: ElementRef;
  @ViewChild('sendEmail') sendEmail: ElementRef;
  email: string
  emailValid: string
  isRecapcha: boolean
  protected aFormGroup: FormGroup;
  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder, private tourBookingService: TourBookingService,private notificationService: NotificationService, private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute, private configService: ConfigService) { }
  isPaymentChange: boolean
  ngOnInit(): void {
    this.paymentService.views().then(res => {this.resPayment = res
    console.log(this.resPayment);
    })
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
    if (this.resAthentication) {
      localStorage.removeItem("tourBooking_" + this.resAthentication.id)
    }
    else{
      localStorage.removeItem("tourBooking_null")
    }
    var idTourBooking = this.activatedRoute.snapshot.paramMap.get('id')
     this.myAngularxQrCode = this.configService.clientUrl + "/bill/"+ idTourBooking;
    this.init(idTourBooking)
  }

  init(idTourBooking: string){
    this.tourBookingService.getTourBooking(idTourBooking).subscribe(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resTourBooking = this.response.content

        if (this.resTourBooking.status == 1 || this.resTourBooking.status == 2) {
          var date = new Date().getTime()
          if (this.resTourBooking.lastDate < date) {
            this.resTourBooking.status = 4
          }
        }
      }
      else{
        // location.assign(this.configService.clientUrl + "/page404")
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
  handleError(){
    this.isRecapcha = false
    this.notificationService.handleAlert('Lỗi capcha !', StatusNotification.Error)
  }

  handleExpire(){
    this.isRecapcha = false
  }
  paymentChange(){
    var payment = this.resPayment.filter(payment => payment.idPayment == this.resTourBooking.payment.idPayment)[0]
    this.resTourBooking.payment = Object.assign({}, payment)
  }
  savePayment(){
    if (this.isPaymentChange) {
      this.isPaymentChange = false
    }
    else{
      this.isPaymentChange = true
    }
  }
  handleSuccess(e: any){
    if (e) {
      this.isRecapcha = true
    }
  }
  cancel(){
    if (this.isRecapcha) {
      this.tourBookingService.cancel(this.resTourBooking.idTourBooking).then(res => {
        this.response = res
        this.notificationService.handleAlertObj(this.response.notification)
          if (this.response.notification.type == StatusNotification.Success) {
            this.cancelTour.nativeElement.click()
            this.captchaElem.resetCaptcha();
            this.isRecapcha = false
            location.reload()
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }


  send(){
    this.emailValid = null
    if (this.email) {
      // this.tourBookingService.cancel(this.resTourBooking.idTourBooking).then(res => {
      //   this.response = res
      //   this.notificationService.handleAlertObj(this.response.notification)
      //     if (this.response.notification.type == StatusNotification.Success) {
      //       this.cancelTour.nativeElement.click()
      //       this.captchaElem.resetCaptcha();
      //       this.isRecapcha = false
      //       location.reload()
      //     }
      //   }, error => {
      //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      //     this.notificationService.handleAlert(message, StatusNotification.Error)
      // })
    }
    else{
      this.emailValid = "Bạn cần phải nhập email !"
    }
  }

  payment(){
    if (this.isRecapcha) {
      this.tourBookingService.cancel(this.resTourBooking.idTourBooking).then(res => {
        this.response = res
        this.notificationService.handleAlertObj(this.response.notification)
          if (this.response.notification.type == StatusNotification.Success) {
            this.cancelTour.nativeElement.click()
            this.captchaElem.resetCaptcha();
            this.isRecapcha = false
            location.reload()
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }
}
