import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services_API/authentication.service';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { OTPModel, ValidationForgotPass } from 'src/app/models/otp.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  validationForgotPass: ValidationForgotPass = new ValidationForgotPass
  email: string
  password: string
  confirmPassword: string
  OTP: OTPModel
  checkOTP: string
  isTrue: boolean = false
  response: ResponseModel
  constructor(private authService: AuthenticationService, private notificationService: NotificationService, private configService: ConfigService,
    private customerService: CustomerService) { }

  ngOnInit(): void {

  }

  btnCheckOTP(){
    if(this.checkOTP === this.OTP.otpCode){
      
      this.isTrue = true
    }
    else{
      // console.log("sai rùi òi ba, nhập lại đi");
    }
  }

  SendOTP(){
    // this.validationForgotPass = new ValidationForgotPass
    // this.validationForgotPass =  this.configService.validateForgotPass(this.OTP, this.validationForgotPass)
    // if (this.validationForgotPass.total == 0) {
    this.customerService.SendOTP(this.email).subscribe(res => {
      this.response = res
      this.notificationService.handleAlertObj(res.notification)

      if (this.response.notification.type == "Success") {
        this.OTP = this.response.content
        console.log(this.OTP);
        
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, "Error")
    })
  // }
  }

  CusForgotPass() {
    this.authService.forgotPassword(this.email, this.password).subscribe(res => {
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
