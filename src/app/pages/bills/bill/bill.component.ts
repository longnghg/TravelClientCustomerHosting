import { Component, OnInit } from '@angular/core';
import { TourBookingModel} from "../../../models/tourBooking.model";
import { StatusBooking} from "../../../enums/enum";
import { ScheduleModel } from "../../../models/schedule.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ConfigService } from "../../../services_API/config.service";
import { ScheduleService } from "../../../services_API/schedule.service";
import { TourBookingService } from "../../../services_API/tourBooking.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ActivatedRoute } from '@angular/router';
import { AuthenticationModel } from "../../../models/authentication.model";
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  response: ResponseModel
  resTourBooking: TourBookingModel
  resSchedule: ScheduleModel
  resAthentication: AuthenticationModel

  constructor(private tourBookingService: TourBookingService,private notificationService: NotificationService, private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute, private configService: ConfigService) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.resAthentication = JSON.parse(localStorage.getItem("currentUser"))
    if (this.resAthentication) {
      localStorage.removeItem("tourBooking_" + this.resAthentication.id)
    }
    else{
      localStorage.removeItem("tourBooking_null")
    }
    var idTourBooking = this.activatedRoute.snapshot.paramMap.get('id')
    this.init(idTourBooking)
  }

  init(idTourBooking: string){
    this.tourBookingService.getTourBooking(idTourBooking).subscribe(res => {
      this.response = res
      if (this.response.notification.type == "Error") {
        location.assign(this.configService.clientUrl + "/#/page404")
      }
      else{
        this.resTourBooking = this.response.content
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }
}
