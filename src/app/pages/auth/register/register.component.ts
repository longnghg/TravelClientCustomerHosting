import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services_API/customer.service';
import { CustomerModel} from "src/app/models/customer.model"
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  response: ResponseModel
  resCustomer: CustomerModel
  listGender = this.configService.listGender()
  formData: any
  birthday: string
  confirmPassword: string
  constructor(private customerService: CustomerService, private notificationService: NotificationService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.resCustomer = new CustomerModel()
    console.log(this.listGender);
    if(this.resCustomer){
      this.birthday = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resCustomer.birthday))
    }
  }

  ngOnChanges(): void {

  }



  save(){

    var valid =  this.configService.validateCustomer(this.resCustomer)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      if(this.resCustomer.password === this.resCustomer.confirmPassword){
        var file = new FormData();
        file.append('data', JSON.stringify(this.resCustomer))

        if (this.formData) {
          file.append('file', this.formData.path[0].files[0])
        }
          this.customerService.create(file).subscribe(res =>{
            this.response = res
           this.notificationService.handleAlertObj(res.notification)
           if(this.response.notification.type == "Success")
           {
             document.location.assign( this.configService.clientUrl + "/#/login")
           }
          }, error => {
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, "Error")
          })
      }
    }
  }


}
