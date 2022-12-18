import { Component } from '@angular/core';
import { AuthenticationModel } from "./models/authentication.model";
import { AuthenticationService } from "../app/services_API/authentication.service";
import { ResponseModel } from "./models/responsiveModels/response.model";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  response: ResponseModel
  auth: AuthenticationModel
  title = 'TravelRover';
  constructor( private authenticationService: AuthenticationService){}
  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    if(this.auth){
      var startDay = new Date();
      var endDay = new Date(this.auth.dateTime)

      var millisBetween = startDay.getTime() - endDay.getTime();

      var days = millisBetween / (1000 * 3600 * 24);

      if (Math.round(Math.abs(days)) == 1) {
        this.authenticationService.logOut(this.auth.id).subscribe(res =>{
          localStorage.removeItem("currentUser")
          localStorage.removeItem("idUser")
          localStorage.removeItem("token")
          sessionStorage.clear()
        })
      }
    }

    var token = localStorage.getItem("tokenDefault")

    if (!token) {
      var input={
        email: "default@gmail.com",
        password: "123"
      }
      this.authenticationService.loginDefault(input).subscribe(res => {
        this.response = res
        this.auth = this.response.content
        localStorage.setItem("tokenDefault", this.auth.token)
      });
    }
  }
}
