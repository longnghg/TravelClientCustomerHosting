import { Component, OnInit } from '@angular/core';
import { TourService } from "../../../services_API/tour.service";
import { ScheduleService } from "../../../services_API/schedule.service";
import { ScheduleModel } from "../../../models/schedule.model";
import { TourBookingModel } from "../../../models/tourBooking.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ProvinceService } from "../../../services_API/province.service";
import { ConfigService } from "../../../services_API/config.service";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { LocationModel } from "../../../models/location.model";
@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
  constructor(private provinceService: ProvinceService, private scheduleService: ScheduleService,private tourService: TourService, private notificationService: NotificationService, private configService: ConfigService, private activatedRoute: ActivatedRoute, private router: Router) { }
  resSchedule: ScheduleModel[]
  resProvince: LocationModel[]
  resTourBooking: TourBookingModel
  response: ResponseModel
  isBack: boolean
  kwFrom: any = null
  kwTo: any = null
  kwDepartureDate: any = ""
  kwReturnDate: any = ""
  from: any
  to: any
  ngOnInit(): void {
    var split =[]

    split = this.activatedRoute.snapshot.paramMap.get('id').split("&")
    this.from = split[0].replace("from=", "")
    this.to = split[1].replace("to=", "")

    this.init(this.activatedRoute.snapshot.paramMap.get('id'))
  }
  init(kw: any){
    this.scheduleService.searchSchedule(kw).subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resSchedule = this.response.content
        console.log(this.resSchedule);

      }
      else{
        location.assign(this.configService.clientUrl + "/#/page404")
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  booking(idSchedule: string, alias: string){
    localStorage.removeItem("tourBooking_" + localStorage.getItem("idUser"))
    this.router.navigate(['','tour-booking',idSchedule, alias]);
  }
}
