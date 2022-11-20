import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services_API/customer.service';
import { CustomerModel, ValidationRegister} from "src/app/models/customer.model"
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { StatusNotification } from "../../../enums/enum";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateRegister: ValidationRegister = new ValidationRegister
  response: ResponseModel
  resCustomer: CustomerModel
  listGender = this.configService.listGender()
  birthday: string
  confirmPassword: string
  isCheck: boolean
  constructor(private customerService: CustomerService, private notificationService: NotificationService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.resCustomer = new CustomerModel()
    if(this.resCustomer){
      this.birthday = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resCustomer.birthday))
    }
  }

  ngOnChanges(): void {

  }



  save(){
    this.validateRegister = new ValidationRegister
    this.validateRegister =  this.configService.validateRegister(this.resCustomer, this.validateRegister)
    if (this.validateRegister.total == 0) {
      if(this.resCustomer.password === this.resCustomer.confirmPassword){

          this.customerService.create(this.resCustomer).subscribe(res =>{
            this.response = res
           if(this.response.notification.type == StatusNotification.Success)
           {
             document.location.assign( this.configService.clientUrl + "/login")
           }
           if(this.response.notification.type == StatusNotification.Validation){

           }
           this.notificationService.handleAlertObj(res.notification)

          }, error => {
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, StatusNotification.Error)
          })

    }
  }
  }

}
