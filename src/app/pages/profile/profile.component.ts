import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from 'src/app/services_API/notification.service';
import { ConfigService } from "../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { CustomerModel, ValidationCustomerModel } from 'src/app/models/customer.model';
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { ActivatedRoute } from '@angular/router';
import { StatusNotification } from "../../enums/enum";
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  response: ResponseModel
  resCustomer: CustomerModel
  validateCustomer: ValidationCustomerModel = new ValidationCustomerModel
  listGender =  this.configService.listGender()
  isEdit: boolean = false
  isChange: boolean = false
  resCusTmp: CustomerModel
  constructor(private activatedRoute: ActivatedRoute,private customerService: CustomerService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {

    this.listGender = this.configService.listGender()

    this.init()
  }

    inputChange(){
      if (JSON.stringify(this.resCustomer) != JSON.stringify(this.resCusTmp)) {
        this.isChange = true
      }
      else{
        this.isChange = false
      }
    }

    isEditChange(){
      if (this.isEdit) {
        this.isEdit = false
        this.backup()
      }
      else{
        this.isEdit = true
      }
    }

    init(){
      var idCus = localStorage.getItem("idUser")
      this.customerService.get(idCus).subscribe(res =>{
        this.response = res
          this.resCustomer = this.response.content
          this.resCusTmp = Object.assign({}, this.resCustomer)
          if(this.resCustomer.birthday){
            this.resCustomer.birthday = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resCustomer.birthday))
          }
      }, error => {

        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }


    save(){
      var valid = this.configService.validateCustomer(this.resCustomer)
      valid.forEach(element => {
        this.notificationService.handleAlert(element, StatusNotification.Success)
      });
      if(valid.length == 0){
        this.customerService.update(this.resCustomer).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.isChange = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
    }

    backup(){
      this.resCustomer = Object.assign({}, this.resCusTmp)
      this.isChange = false
    }

    formatInput(input: HTMLInputElement) {
      input.value = input.value.replace(FILTER_PAG_REGEX, '');
      this.resCustomer.phone = input.value
    }
}
