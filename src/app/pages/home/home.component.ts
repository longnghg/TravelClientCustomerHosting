import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { TourService } from "../../services_API/tour.service";
import { ScheduleService } from "../../services_API/schedule.service";
import { ScheduleModel } from "../../models/schedule.model";
import { TourBookingModel } from "../../models/tourBooking.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { NotificationService } from "../../services_API/notification.service";
import { ProvinceService } from "../../services_API/province.service";
import { ConfigService } from "../../services_API/config.service";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { LocationModel } from "../../models/location.model";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
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
  @ViewChild('slide') slide: ElementRef;
  @ViewChild('cart') cart: ElementRef;
  list = [
    { img: "assets/images/hero-slider-1.jpg", location: "San Francisco."},
    { img: "assets/images/hero-slider-2.jpg", location: "Paris."},
    { img: "assets/images/hero-slider-3.jpg", location: "New Zealand."},
    { img: "assets/images/hero-slider-4.jpg", location: "Maui."},
    { img: "assets/images/hero-slider-5.jpg", location: "London."}]
    img = this.list[0].img
    location = ["San Francisco."," Paris."," New Zealand.", " Maui.", " London."]


  ngOnInit(): void {
    this.provinceService.views().then(res => {this.resProvince = res})
    this.initTour()

    this.resTourBooking= JSON.parse(localStorage.getItem("tourBooking_" + localStorage.getItem("idUser")))
    if (this.resTourBooking) {
     this.isBack = true
    }
    setInterval(() =>{
      this.prev()
    }, 4000)

  }

  backTourBooking(){
    this.isBack = false
    this.router.navigate(['','tour-booking',this.resTourBooking.scheduleId, this.resTourBooking.alias]);
  }

  removeTourBooking(){
    localStorage.removeItem("tourBooking_" + localStorage.getItem("idUser"))
    this.isBack = false
  }

  next(){
    let lists = document.querySelectorAll('.s_item');
    this.slide.nativeElement.appendChild(lists[0]);
  }

  prev(){
    let lists = document.querySelectorAll('.s_item');
    this.slide.nativeElement.prepend(lists[lists.length - 1]);
  }

  initTour(){
    this.scheduleService.gets().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resSchedule = this.response.content
        // this.cd.markForCheck()
        // setTimeout(() => {
        //   this.cd.detach()
        // }, 100);
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

  search(){
    if (!this.kwFrom) {
      this.kwFrom = ""
    }
    if(!this.kwTo){
      this.kwTo = ""
    }
    var kw = "from="+this.kwFrom+"&to="+this.kwTo+"&departureDate="+this.kwDepartureDate+"&returnDate="+this.kwReturnDate
    this.router.navigate(['','tour',kw]);
  }
}

