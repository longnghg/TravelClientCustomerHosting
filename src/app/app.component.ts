import { Component } from '@angular/core';
import { AuthenticationModel } from "./models/authentication.model";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  resAthentication: AuthenticationModel
  title = 'TravelRover';
  ngOnInit(): void {
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
    if(this.resAthentication){
      var startDay = new Date();
      var endDay = new Date(this.resAthentication.dateTime)

      var millisBetween = startDay.getTime() - endDay.getTime();

      var days = millisBetween / (1000 * 3600 * 24);

      if (Math.round(Math.abs(days)) == 1) {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("idUser")
        localStorage.removeItem("token")
        sessionStorage.clear()
      }

    }
  }
}
