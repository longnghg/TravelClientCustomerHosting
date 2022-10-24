import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from "../../layouts/client-layout/client-layout.routing";
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy, ɵparseCookieValue } from '@angular/common';
import { AuthenticationModel } from "../../models/authentication.model";
import { ConfigService } from "../../services_API/config.service";
import { AuthenticationService } from "../../services_API/authentication.service";
import { NotificationService } from "../../services_API/notification.service";
import { ResponseModel } from "../../models/responsiveModels/response.model";
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
  resAthentication: AuthenticationModel = new AuthenticationModel()
  constructor(private notificationService:NotificationService, private authenticationService:AuthenticationService, private configService:ConfigService, location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
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
      localStorage.clear()
      sessionStorage.clear()
      this.resAthentication = null
      location.assign(this.configService.clientUrl + "/#/home")
      location.reload()
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }
}
