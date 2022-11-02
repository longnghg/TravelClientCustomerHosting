import { Component } from '@angular/core';
import { AuthenticationModel } from "./models/authentication.model";
import { AuthenticationService } from "../app/services_API/authentication.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  resAthentication: AuthenticationModel
  title = 'TravelRover';
  constructor( private authenticationService: AuthenticationService){}
  ngOnInit(): void {
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
    if(this.resAthentication){
      var startDay = new Date();
      var endDay = new Date(this.resAthentication.dateTime)

      var millisBetween = startDay.getTime() - endDay.getTime();

      var days = millisBetween / (1000 * 3600 * 24);

      if (Math.round(Math.abs(days)) == 1) {
        this.authenticationService.logOut(this.resAthentication.id).subscribe(res =>{
          localStorage.removeItem("currentUser")
          localStorage.removeItem("idUser")
          localStorage.removeItem("token")
          sessionStorage.clear()
        })
      }

    }
  }
}
