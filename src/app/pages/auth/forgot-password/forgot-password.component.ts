import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from 'src/app/services_API/authentication.service';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { OTPModel, ValidationOtp } from 'src/app/models/otp.model';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { CustomerModel, ValidationForgotPass } from "../../../models/customer.model";
import { StatusNotification } from "../../../enums/enum";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
})
export class ForgotPasswordComponent implements OnInit {
  validationForgotPass: ValidationForgotPass = new ValidationForgotPass
  validationOtp: ValidationOtp = new ValidationOtp
  resCustomer: CustomerModel = new CustomerModel
  confirmPassword: string
  OTP: OTPModel = new OTPModel
  checkOTP: string

  isload: boolean
  isOtp: boolean
  isTrue: boolean = false
  response: ResponseModel
  timePresent: number
  endTime: any
  config: CountdownConfig
  isCountdown: boolean = false

  constructor(private authService: AuthenticationService, private notificationService: NotificationService, private configService: ConfigService,
    private customerService: CustomerService) { }

  ngOnInit(): void {


  }

  btnCheckOTP(){
    this.timePresent = Date.now()
    this.endTime = this.OTP.endTime
    this.validationOtp = new ValidationOtp
    this.validationOtp =  this.configService.validateOtp(this.OTP, this.validationOtp, true)
    if ( this.validationOtp.total == 0) {
      this.isTrue = true
    }
  }

  SendOTP(){
    this.isload = true
    this.validationOtp = new ValidationOtp
    this.validationOtp =  this.configService.validateOtp(this.OTP, this.validationOtp, false)
    if (this.validationOtp.total == 0) {
      this.customerService.SendOTP(this.OTP.email).subscribe(res => {
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        if (this.response.notification.type == StatusNotification.Success) {
          this.isOtp = true
          this.OTP.beginTime = this.response.content.beginTime
          this.OTP.endTime = this.response.content.endTime
          this.OTP.otpCode = this.response.content.otpCode
          this.OTP.id = this.response.content.id

          this.config = { leftTime: 120, format: 'mm:ss'};
          this.isCountdown = false
          this.isload = false
        }
        if(this.response.notification.type == StatusNotification.Error){
          this.isload = false
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
    else{
      this.isload = false
    }
  }
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.isCountdown = true
    }
  }
  CusForgotPass() {
    this.resCustomer.email = this.OTP.email
    this.validationForgotPass = new ValidationForgotPass
    this.validationForgotPass =  this.configService.validateForgotPass(this.resCustomer, this.validationForgotPass)
    if (this.validationForgotPass.total == 0) {
    this.authService.forgotPassword(this.resCustomer).subscribe(res => {
      this.response = res
      this.notificationService.handleAlertObj(res.notification)

      if (this.response.notification.type == StatusNotification.Success) {
        localStorage.clear()
        location.assign(this.configService.clientUrl + "/login")
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
}
}
