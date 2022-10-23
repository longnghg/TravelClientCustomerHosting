import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services_API/authentication.service';
import { CustomerModel} from "src/app/models/customer.model"
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { AuthenticationModel } from 'src/app/models/authentication.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  response: ResponseModel
  password: string
  newPassword: string
  confirmPassword: string
  resAthentication: AuthenticationModel = new AuthenticationModel()
  constructor(private authService: AuthenticationService, private notificationService: NotificationService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
  }

  CuschangePass(){
    var valid =  this.configService.validateChangePass(this.password, this.newPassword, this.confirmPassword)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      var idCustomer = localStorage.getItem("idUser")
          this.authService.changePassword(idCustomer, this.password, this.newPassword).subscribe(res =>{
            this.response = res
           this.notificationService.handleAlertObj(res.notification)

           if(this.response.notification.type == "Success")
           {
             this.logOut()
           }
          }, error => {
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, "Error")
          })
    }
  }

  logOut(){
    this.authService.logOut(this.resAthentication.id).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
      localStorage.clear()
      location.assign(this.configService.clientUrl + "/#/login")
      location.reload()
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }
}
