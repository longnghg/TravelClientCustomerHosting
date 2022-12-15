import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from "../../../services_API/authentication.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { AuthenticationModel, ValidationLoginModel } from "../../../models/authentication.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { CustomerModel } from "../../../models/customer.model";
import { TokenModel } from "../../../models/tokenModel.model";
import { StatusNotification } from "../../../enums/enum";
import { Router } from '@angular/router';

// signalr
import { HubConnection } from '@microsoft/signalr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    //signalr
    private hubConnectionBuilder: HubConnection
  public readonly siteKey = '6Lc_K-YiAAAAANf7vCWU19G-psPfDiWFgV-r6RTc';
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
  @ViewChild('modalBlock') modalBlock: ElementRef;

  resAthentication: AuthenticationModel
  validateAuth: ValidationLoginModel = new ValidationLoginModel;
  resCustomer: CustomerModel = new CustomerModel
  resToken: TokenModel = new TokenModel
  response: ResponseModel
  token: string
  isloading = false
  auth2: any
  countLoginFail = 0
  timeBlock: any
  recapcha: string

  constructor(private router:Router, private configService:ConfigService, private notificationService:NotificationService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    if (history.state.reload) {
      location.reload()
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    var checkCurrent = JSON.parse(localStorage.getItem("currentUser"))
    if (checkCurrent) {
      this.authenticationService.logOut(checkCurrent.id).subscribe(res =>{
        this.response = res
        // this.notificationService.handleAlertObj(res.notification)
        localStorage.removeItem("currentUser")
        localStorage.removeItem("idUser")
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        sessionStorage.clear()
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
    this.googleAuthSDK();
  }
 
  refreshToken(token:string,refToken:string){
    this.resToken.accessToken = token;
    this.resToken.refreshToken = refToken;
    this.authenticationService.login(this.resToken).subscribe(res=>{
       console.log("refreshtoken");
       console.log(res);
       
    })

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

            if(this.response.notification.type == StatusNotification.Success)
            {
              this.resAthentication = this.response.content
              localStorage.setItem("token", this.resAthentication.token)
              localStorage.setItem("refreshToken", this.resAthentication.refToken)
              localStorage.setItem("idUser", this.resAthentication.id)
              localStorage.setItem("currentUser", JSON.stringify(this.resAthentication))

                // connect to signalR
                // this.connectSignalR();

              var tourBooking = localStorage.getItem("tourBooking_null")
              if (tourBooking) {
                localStorage.setItem("tourBooking_" + this.resAthentication.id, tourBooking)
                localStorage.removeItem("tourBooking_null")
              }
              this.notificationService.handleAlertObj(res.notification)

              var wait = sessionStorage.getItem("wait")
              if (wait) {
               this.router.navigateByUrl(wait);
              }
              else{
               this.router.navigate(['', 'home']);
              }
               setTimeout(() => {
                 document.body.scrollTop = 0;
                 document.documentElement.scrollTop = 0;
               }, 200);
            }
            else if(this.response.notification.type == StatusNotification.Block){
              this.timeBlock = this.response.content
              this.modalBlock.nativeElement.click()
              this.isloading = false
            }
            else{
              this.countLoginFail +=1
              if (this.countLoginFail > 5) {
                this.authenticationService.block(this.resCustomer.email).subscribe(res => {
                  this.response = res
                  if (this.response.notification.type == StatusNotification.Error) {
                    localStorage.setItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resCustomer.email,(new Date(new Date().getTime() +30*60000).getTime()).toString())
                  }

                  this.countLoginFail = 0
                })
              }
              this.notificationService.handleAlertObj(res.notification)
            }


            this.isloading = false

          }, error => {
            this.isloading = false
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, StatusNotification.Error)
          })
        }
      }

  }
  // connectSignalR(){
  //   this.hubConnectionBuilder = this.configService.signIR()
  //   this.hubConnectionBuilder.start().then(function(){
  //       console.log("Successfully connect");
  //   });

  //   this.hubConnectionBuilder.on('Message', (result: any) => {
  //     console.log("Nhan dc tin heiu");
  //   })
  // }
  googleLogin(){
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {
        let profile = googleAuthUser.getBasicProfile();
        this.resCustomer.email = profile.getEmail(),
        this.resCustomer.nameCustomer = profile.getName(),
        this.resCustomer.googleToken = googleAuthUser.getAuthResponse().id_token
        this.authenticationService.login(this.resCustomer).subscribe(res=>{
          this.response = res
          if(this.response.notification.type == StatusNotification.Success)
          {
            
            this.resAthentication = this.response.content
            console.log(this.resAthentication);

            localStorage.setItem("token", this.resAthentication.token)
            localStorage.setItem("refreshToken", this.resAthentication.refToken)
            localStorage.setItem("idUser", this.resAthentication.id)
            localStorage.setItem("currentUser", JSON.stringify(this.resAthentication))
            


                // connect to signalR
                // this.connectSignalR();
            var tourBooking = localStorage.getItem("tourBooking_null")
            if (tourBooking) {
              localStorage.setItem("tourBooking_" + this.resAthentication.id, tourBooking)
              localStorage.removeItem("tourBooking_null")
            }
            this.notificationService.handleAlertObj(res.notification)
          var wait = sessionStorage.getItem("wait")
           if (wait) {
            this.router.navigateByUrl(wait);
           }
           else{
            this.router.navigate(['', 'home']);
           }
            setTimeout(() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }, 200);
            // document.location.assign( this.configService.clientUrl + "/home")
          }
          else if(this.response.notification.type == StatusNotification.Block){
            this.timeBlock = this.response.content
            this.modalBlock.nativeElement.click()
            this.isloading = false
          }
          else if(this.response.notification.type == StatusNotification.Block){
            this.countLoginFail +=1
            if (this.countLoginFail > 5) {
              this.authenticationService.block(this.resCustomer.email).subscribe(res => {
                this.response = res
                if (this.response.notification.type == StatusNotification.Error) {
                  localStorage.setItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resCustomer.email,(new Date(new Date().getTime() +30*60000).getTime()).toString())
                }

                this.countLoginFail = 0
              })
            }
          }else{
            this.notificationService.handleAlertObj(res.notification)
          }


          this.isloading = false

        }, error => {
          this.isloading = false
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
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
