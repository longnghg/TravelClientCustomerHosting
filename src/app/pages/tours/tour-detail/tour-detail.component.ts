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

  constructor(private scheduleService: ScheduleService, private notificationService: NotificationService, private configService: ConfigService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

}
