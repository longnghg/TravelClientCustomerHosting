import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ROUTES } from "../../layouts/client-layout/client-layout.routing";
import { Location, LocationStrategy, NgIf, PathLocationStrategy, ɵparseCookieValue } from '@angular/common';
import { AuthenticationModel } from "../../models/authentication.model";
import { ConfigService } from "../../services_API/config.service";
import { AuthenticationService } from "../../services_API/authentication.service";
import { NotificationService } from "../../services_API/notification.service";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { ActivatedRoute, Router} from '@angular/router';
import { StatusNotification } from "../../enums/enum";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus: any;
  public listTitles: any;
  public location: Location;
  response: ResponseModel
  @ViewChild('nav') nav: ElementRef;
  resAthentication: AuthenticationModel = new AuthenticationModel()
  constructor(private activatedRoute:ActivatedRoute, private notificationService:NotificationService, private authenticationService:AuthenticationService, private configService:ConfigService, location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngAfterViewChecked(): void {
    if (this.router.routerState.snapshot.url == "/home"){
      this.nav.nativeElement.style.marginBottom = "-8%"
      this.nav.nativeElement.style.backgroundColor = ""
      // if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ){
      //   this.nav.nativeElement.style.backgroundColor = "#6998AB"
      // }
      // else{
      //   this.nav.nativeElement.style.backgroundColor = ""
      //  }
    }
    else{
      this.nav.nativeElement.style.marginBottom = "2%"
      this.nav.nativeElement.style.backgroundColor = "#6998AB"
    }

  }

  onRouterLinkActive(e: any, i: number){
    if (e) {
      this.listTitles[i].class = "active"
    }
    else  {
      this.listTitles[i].class = ""
    }
  }

  logOut(){
    this.authenticationService.logOut(this.resAthentication.id).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
      localStorage.removeItem("currentUser")
      localStorage.removeItem("idUser")
      localStorage.removeItem("token")
      sessionStorage.clear()
      this.resAthentication = null
      location.assign(this.configService.clientUrl + "/#/home")
      location.reload()
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
}
