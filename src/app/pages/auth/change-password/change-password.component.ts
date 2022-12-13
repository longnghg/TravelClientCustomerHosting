import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services_API/authentication.service';
import { CustomerModel, ValidationChangePass} from "src/app/models/customer.model"
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { StatusNotification } from "../../../enums/enum";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  response: ResponseModel
  resCustomer: CustomerModel
  password: string
  newPassword: string
  confirmPassword: string
  idUser: string
  resAthentication: AuthenticationModel = new AuthenticationModel()
  validationChangePass: ValidationChangePass = new ValidationChangePass()
  constructor(private authService: AuthenticationService, private notificationService: NotificationService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.resCustomer = new CustomerModel
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
    this.resCustomer.idCustomer = this.resAthentication.id
  }

  CuschangePass(){
    this.validationChangePass = new ValidationChangePass
    this.validationChangePass =  this.configService.validateChangePass(this.resCustomer, this.validationChangePass)
    if (this.validationChangePass.total == 0) {
          this.resCustomer.idCustomer = this.resAthentication.id
          this.authService.changePassword(this.resCustomer.idCustomer, this.resCustomer.password, this.resCustomer.newPassword).subscribe(res =>{
            this.response = res

           if(this.response.notification.type == StatusNotification.Success)
           {
            this.notificationService.handleAlertObj(res.notification)
             this.logOut()
           }
          }, error => {
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, StatusNotification.Error)
          })
        }
  }

  logOut(){
    this.authService.logOut(this.resAthentication.id).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
      localStorage.removeItem("currentUser")
        localStorage.removeItem("idUser")
        localStorage.removeItem("token")
        sessionStorage.clear()
      location.assign(this.configService.clientUrl + "/login")
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
}
