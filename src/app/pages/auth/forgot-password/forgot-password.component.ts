import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services_API/authentication.service';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { OTPModel, ValidationOtp } from 'src/app/models/otp.model';
import { CountdownComponent } from 'ngx-countdown/countdown.component';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { CustomerModel, ValidationForgotPass } from "../../../models/customer.model";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
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
  config: CountdownConfig = { leftTime: 120, format: 'mm:ss'};
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

      // if(this.checkOTP === this.OTP.otpCode){
      //   // if(this.endTime > this.timePresent){ //thằng này đang chạy đc chưa rồi á
      //   // }
      //   // else{
      //   //   console.log("quá thời gian");
      //   // }
      // }
    }

    if (this.validationOtp.checkOTP) {
      this.isCountdown = true
    }
  }

  SendOTP(){
    this.isload = true
    this.validationOtp = new ValidationOtp
    this.validationOtp =  this.configService.validateOtp(this.OTP, this.validationOtp, false)
    console.log(this.validationOtp);
    
    if (this.validationOtp.total == 0) {
      this.customerService.SendOTP(this.OTP.email).subscribe(res => {
        this.response = res
        this.notificationService.handleAlertObj(res.notification)

        if (this.response.notification.type == "Success") {
          this.isOtp = true
          this.OTP = this.response.content
          console.log(this.OTP);
          
          this.config = { leftTime: 120, format: 'mm:ss'};
          this.isCountdown = false
          this.isload = false
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, "Error")
      })
    }
    else{
      this.isload = false
    }
  }
  handleEvent(e: CountdownEvent) {
    // this.notify = e.action.toUpperCase();
    // if (e.action === 'notify') {
    //   this.notify += ` - ${e.left} ms`;
    // }
    // console.log('Notify', e);
  }
  CusForgotPass() {
    this.validationForgotPass = new ValidationForgotPass
    this.validationForgotPass =  this.configService.validateForgotPass(this.resCustomer, this.validationForgotPass)
    this.authService.forgotPassword(this.resCustomer).subscribe(res => {
      this.response = res
      this.notificationService.handleAlertObj(res.notification)

      if (this.response.notification.type == "Success") {
        localStorage.clear()
        location.assign(this.configService.clientUrl + "/#/login")
        location.reload()
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, "Error")
    })
  }

}
