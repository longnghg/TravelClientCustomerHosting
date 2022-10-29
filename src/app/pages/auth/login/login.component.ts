import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from "../../../services_API/authentication.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { AuthenticationModel, ValidationLoginModel } from "../../../models/authentication.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { CustomerModel } from "../../../models/customer.model";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
  @ViewChild('modalBlock') modalBlock: ElementRef;
  resAthentication: AuthenticationModel
  validateAuth: ValidationLoginModel = new ValidationLoginModel;
  resCustomer: CustomerModel = new CustomerModel
  response: ResponseModel
  token: string
  isloading = false
  auth2: any
  countLoginFail = 0
  timeBlock: any
  constructor( private configService:ConfigService, private notificationService:NotificationService, private authenticationService:AuthenticationService) { }


  ngOnInit(): void {
    var checkCurrent = JSON.parse(localStorage.getItem("currentUser"))
    if (checkCurrent) {
      this.authenticationService.logOut(checkCurrent.id).subscribe(res =>{
        this.response = res
        // this.notificationService.handleAlertObj(res.notification)
        localStorage.removeItem("currentUser")
        localStorage.removeItem("idUser")
        localStorage.removeItem("token")
        sessionStorage.clear()
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
    this.googleAuthSDK();
  }

  login(){
    this.validateAuth = new ValidationLoginModel
    this.validateAuth = this.configService.validateLogin(this.resCustomer, this.validateAuth)
    if (this.validateAuth.total == 0) {
      this.isloading = true
      this.timeBlock = Number.parseInt(localStorage.getItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resCustomer.email))

      if (new Date().getTime() >= this.timeBlock) {
        localStorage.removeItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resCustomer.email)
        this.timeBlock = null
        this.countLoginFail = 0
      }

    if (this.timeBlock) {
      this.modalBlock.nativeElement.click()
      this.isloading = false
    }
    else{
      this.authenticationService.login(this.resCustomer).subscribe(res=>{
        this.response = res

        if(this.response.notification.type == "Success")
        {
          this.resAthentication = this.response.content
          localStorage.setItem("token", this.resAthentication.token)
          localStorage.setItem("idUser", this.resAthentication.id)
          localStorage.setItem("currentUser", JSON.stringify(this.resAthentication))

          var tourBooking = localStorage.getItem("tourBooking_null")
          if (tourBooking) {
            localStorage.setItem("tourBooking_" + this.resAthentication.id, tourBooking)
            localStorage.removeItem("tourBooking_null")
          }
          document.location.assign( this.configService.clientUrl + "/#/home")
        }
        else{
          this.countLoginFail +=1
          if (this.countLoginFail > 5) {
           localStorage.setItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resCustomer.email,(new Date(new Date().getTime() +30*60000).getTime()).toString())
          }
        }

        this.notificationService.handleAlertObj(res.notification)

        this.isloading = false

      }, error => {
        this.isloading = false
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
    }


  }

  googleLogin(){
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {
        let profile = googleAuthUser.getBasicProfile();
        this.resCustomer.email = profile.getEmail(),
        this.resCustomer.nameCustomer = profile.getName(),
        this.resCustomer.googleToken = googleAuthUser.getAuthResponse().id_token
        this.authenticationService.login(this.resCustomer).subscribe(res=>{
          this.response = res

          if(this.response.notification.type == "Success")
          {
            this.resAthentication = this.response.content
            localStorage.setItem("token", this.resAthentication.token)
            localStorage.setItem("idUser", this.resAthentication.id)
            localStorage.setItem("currentUser", JSON.stringify(this.resAthentication))

            var tourBooking = localStorage.getItem("tourBooking_null")
            if (tourBooking) {
              localStorage.setItem("tourBooking_" + this.resAthentication.id, tourBooking)
              localStorage.removeItem("tourBooking_null")
            }
            document.location.assign( this.configService.clientUrl + "/#/home")
          }
          else{
            this.countLoginFail +=1
            if (this.countLoginFail > 5) {
             localStorage.setItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resCustomer.email,(new Date(new Date().getTime() +30*60000).getTime()).toString())
            }
          }

          this.notificationService.handleAlertObj(res.notification)

          this.isloading = false

        }, error => {
          this.isloading = false
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      });
  }

    googleAuthSDK() {
      (<any>window)['googleSDKLoaded'] = () => {
        (<any>window)['gapi'].load('auth2', () => {
          this.auth2 = (<any>window)['gapi'].auth2.init({
            client_id: '378123743150-lkj0e75fgsl1mmkpq2ur6oceo413iq3q.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: ''
          });
          this.googleLogin();
        });
      }

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script');
        js.id = id;
        js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
        fjs?.parentNode?.insertBefore(js, fjs);
      }(document, 'script', 'google-jssdk'));
    }


}
