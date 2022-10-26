import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Pipe, PipeTransform  } from '@angular/core';
import { ScheduleService } from "../../../services_API/schedule.service";
import { ScheduleModel } from "../../../models/schedule.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  resSchedule: ScheduleModel
  response: ResponseModel
  constructor(private scheduleService: ScheduleService, private notificationService: NotificationService, private configService: ConfigService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.init(this.activatedRoute.snapshot.paramMap.get('id1'))
  }

 init(idSchedule: string){
    this.scheduleService.getsSchedulebyIdSchedule(idSchedule).subscribe(res => {
      this.response = res
      this.resSchedule = this.response.content
      if(!this.response.notification.type)
      {
        // if (this.resSchedule.finalPriceHoliday == 0) {
        //   this.resSchedule.priceAdult = this.resSchedule.finalPrice
        //   this.resSchedule.priceChild = this.resSchedule.finalPrice - (this.resSchedule.finalPrice * 50 / 100)
        //   this.resSchedule.priceBaby = 0
        // }
        // else{
        //   this.resSchedule.priceAdult = this.resSchedule.finalPriceHoliday
        //   this.resSchedule.priceChild = this.resSchedule.finalPriceHoliday - (this.resSchedule.finalPriceHoliday * 50 / 100)
        //   this.resSchedule.priceBaby = 0
        // }

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
