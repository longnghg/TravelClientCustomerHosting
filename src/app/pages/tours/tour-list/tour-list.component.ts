import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { TourService } from "../../../services_API/tour.service";
import { ScheduleService } from "../../../services_API/schedule.service";
import { ScheduleModel, SearchScheduleFilter } from "../../../models/schedule.model";
import { TourBookingModel } from "../../../models/tourBooking.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ProvinceService } from "../../../services_API/province.service";
import { ConfigService } from "../../../services_API/config.service";
import { ActivatedRoute, Router, NavigationStart, Data } from '@angular/router';
import { LocationModel } from "../../../models/location.model";
import { StatusNotification } from "../../../enums/enum";

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
  constructor(private provinceService: ProvinceService, private scheduleService: ScheduleService,private tourService: TourService, private notificationService: NotificationService, private configService: ConfigService, private activatedRoute: ActivatedRoute, private router: Router) { }
  url = this.configService.apiUrl
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

  totalResult: number
  pageCount: number = 1
  pageSize: number = 15
  index: number = 0
  pageNumber: number = 1
  start: number = 0
  end: number = 0
  btnPrev: boolean = false
  btnNext: boolean = true
  resScheduleFilter: SearchScheduleFilter
  @ViewChild('toTop') toTop: ElementRef;
  ngOnInit(): void {
    var split =[]

    split = this.activatedRoute.snapshot.paramMap.get('id').split("&")
    this.from = split[0].replace("from=", "")
    this.to = split[1].replace("to=", "")

    this.init(this.activatedRoute.snapshot.paramMap.get('id'))

    this.resTourBooking= JSON.parse(localStorage.getItem("tourBooking_" + localStorage.getItem("idUser")))
    if (this.resTourBooking) {
     this.isBack = true
    }
    
  }

  ngOnChanges(): void {
    
    
  }

  ngAfterViewChecked(): void {
    if(document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000 ){
      this.toTop.nativeElement.style.display = "block"
     }
     else{
      this.toTop.nativeElement.style.display = "none"
     }
  }
  init(kw: any){
    this.scheduleService.searchSchedule(kw).then(res => {
      this.response = res
      if ( this.response.notification.type == StatusNotification.Success) {
        this.resSchedule = this.response.content
        this.calTotalResult()
        this.calStartEnd()
      }
      // if(!this.resSchedule)
      // {
      //   location.assign(this.configService.clientUrl + "/page404")

      // }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initFilter(data: any){

    this.scheduleService.searchSheduleFilter(data).then(res => {
      this.response = res
      if ( this.response.notification.type == StatusNotification.Success) {
        this.resSchedule = this.response.content
        this.calTotalResult()
        this.calStartEnd()
      }
      // if(!this.resSchedule)
      // {
      //   location.assign(this.configService.clientUrl + "/page404")

      // }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  searchFilter(value: any) {
    this.resScheduleFilter = value;
    console.log(this.resScheduleFilter);
    if(this.resScheduleFilter){
      this.initFilter(this.resScheduleFilter)
      this.resScheduleFilter = new SearchScheduleFilter
    }
  }

  booking(idSchedule: string, alias: string){
    localStorage.removeItem("tourBooking_" + localStorage.getItem("idUser"))
    this.router.navigate(['','tour-booking',idSchedule, alias]);
  }

  calStartEnd(){
    this.start = ((this.pageNumber - 1) * this.pageSize) + 1
    this.end = this.start + this.pageSize - 1
  }
  calTotalResult(){
    if (this.resSchedule) {
      for (let index = 0; index < this.resSchedule.length; index++) {
        this.resSchedule[index].rowNum = index+1
      }

      this.totalResult = this.resSchedule.length
      if(this.totalResult % this.pageSize == 0){
        this.pageCount = this.totalResult / this.pageSize
      }
      else{
        this.pageCount = Math.floor(this.totalResult / this.pageSize + 1)
      }

      if (this.pageCount == 1) {
         this.btnNext = false
      }
      else{
        this.btnNext = true
      }
      this.index = (this.pageNumber - 1) * this.pageSize
    }
  }
  selectPage(page: string, type: string) {
    var index = parseInt(page)
    if (type == 'prev' && index > 1) {
      this.pageNumber = index - 1
    }
    else if(type == 'next' && index < this.pageCount){
      this.pageNumber = index + 1
    }
    else if(type == 'nextAll'){
      this.pageNumber = this.pageCount
    }
    else if (type == 'prevAll') {
      this.pageNumber = 1
    }
    else{
      if (index > this.pageCount) {
        this.pageNumber = this.pageCount
      }
      else if (index == 0){
        this.pageNumber = 1
      }
      else{
        this.pageNumber = index
      }
    }

    if (this.pageNumber == 1) {
      this.btnPrev = false
    }
    else{
      this.btnPrev = true
    }

    if (this.pageNumber == this.pageCount) {
      this.btnNext = false
    }
    else{
      this.btnNext = true
    }

    this.calTotalResult()
    this.calStartEnd()
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  backToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  backTourBooking(){
    this.isBack = false
    this.router.navigate(['','tour-booking',this.resTourBooking.scheduleId, this.resTourBooking.alias]);
  }

  removeTourBooking(){
    localStorage.removeItem("tourBooking_" + localStorage.getItem("idUser"))
    this.isBack = false
  }
}
