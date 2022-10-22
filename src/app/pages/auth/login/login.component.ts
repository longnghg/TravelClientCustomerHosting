import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from "../../../services_API/authentication.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { AuthenticationModel } from "../../../models/authentication.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { CustomerModel } from "../../../models/customer.model";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
  resAthentication: AuthenticationModel
  resCustomer: CustomerModel = new CustomerModel
  response: ResponseModel
  token: string
  isloading = false
  auth2: any
  constructor( private configService:ConfigService, private notificationService:NotificationService, private authenticationService:AuthenticationService) { }


  ngOnInit(): void {
    this.googleAuthSDK();
  }

  login(){
    this.isloading = true
    this.authenticationService.login(this.resCustomer).subscribe(res=>{
      this.response = res

      this.notificationService.handleAlertObj(res.notification)
      if(this.response.notification.type == "Success")
      {
        this.resAthentication = this.response.content
        localStorage.setItem("token", this.resAthentication.token)
        localStorage.setItem("idUser", this.resAthentication.id)
        localStorage.setItem("currentUser", JSON.stringify(this.resAthentication))
        document.location.assign( this.configService.clientUrl + "/#/home")
      }

      this.isloading = false

    }, error => {
      this.isloading = false
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  googleLogin(){
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {
        let profile = googleAuthUser.getBasicProfile();
        this.resCustomer.email = profile.getEmail(),
        this.resCustomer.nameCustomer = profile.getName(),
        this.resCustomer.googleToken = googleAuthUser.getAuthResponse().id_token
        this.login()
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
