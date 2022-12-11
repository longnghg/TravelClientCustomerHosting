import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TourService } from "../../services_API/tour.service";
import { ScheduleService } from "../../services_API/schedule.service";
import { ScheduleModel } from "../../models/schedule.model";
import { TourModel } from "../../models/tour.model";
import { TourBookingModel } from "../../models/tourBooking.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { NotificationService } from "../../services_API/notification.service";
import { ProvinceService } from "../../services_API/province.service";
import { ConfigService } from "../../services_API/config.service";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { LocationModel } from "../../models/location.model";
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { StatusNotification } from "../../enums/enum";
import { BannerService } from "../../services_API/banner.service"
import { ImageModel } from 'src/app/models/image.model';
import { GroupMessage, Message } from "../../models/message.model";
// signalr
import { NavbarComponent  } from "../../components/navbar/navbar.component";
import { AuthenticationModel } from "../../models/authentication.model";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
     //signalr
    //  private hubConnectionBuilder: HubConnection
  constructor(private provinceService: ProvinceService,
    private scheduleService: ScheduleService,
    private tourService: TourService,
    private notificationService: NotificationService,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private _bannerService: BannerService,
    private navbarComponent: NavbarComponent,
    private router: Router) { }
  // message
  messA: string
  messB:string
  messC:string
  resSchedule: ScheduleModel[]
  resScheduleFalshSale: ScheduleModel[]
  resSchedulePromotion: ScheduleModel[]
  resTour: TourModel[]
  resProvince: LocationModel[]
  resTourBooking: TourBookingModel
  scheduleIndex: number = 0
  response: ResponseModel
  isBack: boolean
  kwFrom: any = "TP Hồ Chí Minh"
  kwTo: any = null
  kwDepartureDate: any = ""
  kwReturnDate: any = ""
  valueFalshSale = 50
  resListImage: ImageModel[]
  resMess: Message[]
  resGroup: GroupMessage = new GroupMessage
  dataSend: Message = new Message
  cardFocus: boolean
  @ViewChild('slide') slide: ElementRef;
  @ViewChild('toTop') toTop: ElementRef;
  @ViewChild('card') card: ElementRef
  @ViewChild('mess') mess: ElementRef
  list = [
    { img: "assets/images/hero-slider-1.jpg", location: "San Francisco." },
    { img: "assets/images/hero-slider-2.jpg", location: "Paris." },
    { img: "assets/images/hero-slider-3.jpg", location: "New Zealand." },
    { img: "assets/images/hero-slider-4.jpg", location: "Maui." },
    { img: "assets/images/hero-slider-5.jpg", location: "London." }]
  img = this.list[0].img
  location = ["San Francisco.", " Paris.", " New Zealand.", " Maui.", " London."]

  countdownTimeUnits: Array<[string, number]> = [
    ['Y', 1000 * 60 * 60 * 24 * 365], // years
    ['M', 1000 * 60 * 60 * 24 * 30], // months
    ['D', 1000 * 60 * 60 * 24], // days
    ['H', 1000 * 60 * 60], // hours
    ['m', 1000 * 60], // minutes
    ['s', 1000], // seconds
    ['S', 1], // million seconds
  ];


  pageIndex= 1
  pageSize= 6

  auth: AuthenticationModel
  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.provinceService.views().then(res => { this.resProvince = res })
    this.initFlashSale()
    this.initSchedulePromotion()
    this.initSchedule()
    this.initTour()
    this.resTourBooking = JSON.parse(localStorage.getItem("tourBooking_" + localStorage.getItem("idUser")))
    if (this.resTourBooking) {
      this.isBack = true
    }
    // setInterval(() => {
    //   this.prev()
    // }, 4000)

    this._bannerService.GetBannerAll().subscribe(res => {
      this.response = res
      this.resListImage = this.response.content

    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
    this.initChat()
    this.loadMessageSignalR()
  }

  ngAfterViewChecked(): void {
    // if (!this.auth) {
    //     this.closeMess()
    // }
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
      this.toTop.nativeElement.style.display = "block"
    }
    else {
      this.toTop.nativeElement.style.display = "none"
    }

  }
  loadMessageSignalR(){
      this.navbarComponent.hubConnectionBuilder.on('Message', (result: any) => {
        this.initChat();
      })
  }
  GuimailA(){
    console.log("ban vua nhan tin voi A" + this.messA);

    this.configService.callChatSignalR("B07A87D7-C378-4E6C-9AF8-447A3EE852B1");
  }
  GuimailB(){
    console.log("ban vua nhan tin voi B" + this.messB);

    this.configService.callChatSignalR("2DAFA092-7D3A-4DA8-1BDC-08DAD9EF2389");
  }
  GuimailC(){
    console.log("ban vua nhan tin voi C" + this.messC);

    this.configService.callChatSignalR("CC368B02-2582-4994-8E7A-AEB9863DF3DC");
  }
  backTourBooking() {
    this.isBack = false
    this.router.navigate(['', 'tour-booking', this.resTourBooking.scheduleId, this.resTourBooking.alias]);
  }

  removeTourBooking() {
    localStorage.removeItem("tourBooking_" + localStorage.getItem("idUser"))
    this.isBack = false
  }

  next() {
    let lists = document.querySelectorAll('.s_item');
    this.slide.nativeElement.appendChild(lists[0]);
  }

  prev() {
    let lists = document.querySelectorAll('.s_item');
    this.slide.nativeElement.prepend(lists[lists.length - 1]);
  }

  initFlashSale() {
    this.scheduleService.getsScheduleFlashSale(this.pageIndex, this.pageSize).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resScheduleFalshSale = this.response.content

        this.resScheduleFalshSale.forEach(schedule => {
          if (schedule.isHoliday) {
            schedule.priceFlashSale = schedule.finalPriceHoliday - (schedule.finalPriceHoliday * this.valueFalshSale / 100)
          }
          else {
            schedule.priceFlashSale = schedule.finalPrice - (schedule.finalPrice * this.valueFalshSale / 100)
          }
          var days = (schedule.endDate - new Date().getTime()) / (1000 * 3600 * 24);
          schedule.outOfTime = Math.abs(days)

          schedule.countdownConfig = this.countDownTime(schedule.outOfTime)
        });

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initSchedule() {
    this.scheduleService.getsSchedule(this.pageIndex, this.pageSize).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resSchedule = this.response.content
        // this.cd.markForCheck()
        // setTimeout(() => {
        //   this.cd.detach()
        // }, 100);

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initSchedulePromotion() {
    this.scheduleService.getsSchedulePromotion(this.pageIndex, this.pageSize).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resSchedulePromotion = this.response.content
        this.resSchedulePromotion.forEach(schedule => {

          if (schedule.isHoliday) {
            schedule.pricePromotion = schedule.finalPriceHoliday - (schedule.finalPriceHoliday * schedule.valuePromotion / 100)
          }
          else {
            schedule.pricePromotion = schedule.finalPrice - (schedule.finalPrice * schedule.valuePromotion / 100)
          }
        });
        // this.cd.markForCheck()
        // setTimeout(() => {
        //   this.cd.detach()
        // }, 100);

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initTour() {
    this.tourService.getsTourByRating(this.pageIndex, this.pageSize).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resTour = this.response.content

        this.resTour.forEach(tour => {
          tour.schedules.forEach(schedule => {
            if (schedule.promotions.idPromotion != 1) {
              if (schedule.isHoliday) {
                schedule.pricePromotion = schedule.finalPriceHoliday - (schedule.finalPriceHoliday * schedule.promotions.value / 100)
              }
              else {
                schedule.pricePromotion = schedule.finalPrice - (schedule.finalPrice * schedule.promotions.value / 100)
              }
            }
          })
          tour.schedules.unshift(Object.assign({}, tour.schedules[0]))
        });
        // this.cd.markForCheck()
        // setTimeout(() => {
        //   this.cd.detach()
        // }, 100);

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  scheduleChange(tour: TourModel, departureDate: any) {
    tour.schedules.forEach(schedule => {
      if (schedule.departureDate == departureDate) {
        // tour.schedules[0].idSchedule = schedule.idSchedule
        // tour.schedules[0].description = schedule.description
        // tour.schedules[0].departurePlace = schedule.departurePlace
        // tour.schedules[0].alias = schedule.alias
        // tour.schedules[0].isHoliday = schedule.isHoliday
        // tour.schedules[0].finalPrice = schedule.finalPrice
        // tour.schedules[0].finalPriceHoliday = schedule.finalPriceHoliday
        // tour.schedules[0].isHoliday = schedule.isHoliday
        // tour.schedules[0].returnDate = schedule.returnDate
        tour.schedules[0] = Object.assign({}, schedule)
      }
    });
  }
  booking(idSchedule: string, alias: string) {
    localStorage.removeItem("tourBooking_" + localStorage.getItem("idUser"))
    this.router.navigate(['', 'tour-booking', idSchedule, alias]);
  }

  search() {
    if (!this.kwFrom) {
      this.kwFrom = ""
    }
    if (!this.kwTo) {
      this.kwTo = ""
    }
    var kw = "from=" + this.kwFrom + "&to=" + this.kwTo + "&departureDate=" + this.kwDepartureDate + "&returnDate=" + this.kwReturnDate
    this.router.navigate(['', 'tour', kw]);
  }

  backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  countDownTime(outOfTime: number): CountdownConfig {
    return {
      leftTime: outOfTime * 60 * 60 * 24,
      formatDate: ({ date, formatStr }) => {
        let duration = Number(date || 0);
        return this.countdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
              return v.toString().padStart(match.length, '0');
            });
          }
          return current;
        }, formatStr);
      },
    };
  }
  handleEvent(e: CountdownEvent, index: number) {
    if (e.action === 'done') {
      this.resScheduleFalshSale.splice(index, 1)
    }
  }

  initChat(){
    this.notificationService.view(this.auth.id).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resMess = this.response.content
        if (this.resMess) {
          this.resGroup.totalNew = 0
          this.resMess.forEach(item =>{
            if (!item.isSeen) {
              this.resGroup.totalNew += 1
            }
          })
          if (this.resGroup.totalNew > 0) {
            this.resGroup.isSeen = false
          }
          else{
            this.resGroup.isSeen = true
          }

          if (this.cardFocus) {
            if (!this.resGroup.isSeen) {
              this.updateIsSeen()
            }
            setTimeout(() => {
              document.getElementById("mess").scrollTop = document.getElementById("mess").scrollHeight
            }, 200);
          }
        }
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  reply(){
    this.dataSend.senderId = this.auth.id
    this.dataSend.senderName = this.auth.name
    this.notificationService.reply(this.dataSend).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.configService.callChatSignalR(this.response.content)
        this.dataSend = new Message
        this.initChat()
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  openMess(){
    this.cardFocus = true
    this.initChat()
    this.card.nativeElement.style.display = "block"
    this.mess.nativeElement.style.display = "none"
    this.card.nativeElement.setAttribute("class","card-mess card-mess-open")
  }

  closeMess(){
    this.cardFocus = false
    this.mess.nativeElement.style.display = "block"
    this.mess.nativeElement.setAttribute("class","mess card-mess-open")
    this.card.nativeElement.setAttribute("class","card-mess card-mess-close")
    setTimeout(() => {
      this.card.nativeElement.removeAttribute("style")
    }, 300);
  }

  updateIsSeen(){
    this.notificationService.updateIsSeenMess(this.auth.id, this.resMess[0].receiverId).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resGroup.isSeen = true
        this.resGroup.totalNew = 0

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
}

