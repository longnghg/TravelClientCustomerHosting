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
import { TourBookingService } from 'src/app/services_API/tourBooking.service';
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
    private tourbookingService: TourBookingService,
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
  tourBookingNo: TourBookingModel
  scheduleIndex: number = 0
  response: ResponseModel
  isBack: boolean = false
  kwFrom: any = "Hồ Chí Minh"
  kwTo: any = null
  kwDepartureDate: any = ""
  kwReturnDate: any = ""
  kwBookingNo: any = ""
  valueFalshSale = 50
  resListImage: ImageModel[]
  resMess: Message[]
  resGroup: GroupMessage = new GroupMessage
  dataSend: Message = new Message
  cardFocus: boolean
  imgNew = "assets/images/icons/new.png"
  createDateAfter30Day: any
  dateNow: any
  @ViewChild('slide') slide: ElementRef;
  @ViewChild('toTop') toTop: ElementRef;
  @ViewChild('card') card: ElementRef
  @ViewChild('cardH') cardH: ElementRef
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

    this.provinceService.views().then(res => { this.resProvince = res })
    this.resTourBooking = JSON.parse(localStorage.getItem("tourBooking_" + localStorage.getItem("idUser")))
    var date = Date.now()
    this.dateNow = new Date(date).getTime()

    if (this.resTourBooking) {
      this.isBack = true
    }
    // setInterval(() => {
    //   this.prev()
    // }, 4000)

   setTimeout(() => {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    if (!this.auth) {
      this.auth = JSON.parse(localStorage.getItem("authGuest"))
    }
    this.initFlashSale()
    this.initSchedulePromotion()
    this.initSchedule()
    this.initTour()
    this.initBanner()
    this.initChat()
    this.loadMessageSignalR()
   }, 1000);
  }
  ngDoCheck(): void {
    this.resTourBooking = JSON.parse(localStorage.getItem("tourBooking_" + localStorage.getItem("idUser")))
    if (this.resTourBooking) {
      this.isBack = true
    }
    else{
      this.isBack = false
    }

  }
  ngAfterViewChecked(): void {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
      this.toTop.nativeElement.style.display = "block"
      if (this.resTourBooking) {
       if (this.auth) {
        this.mess.nativeElement.style.bottom = "13%"
       }
        this.cardH.nativeElement.style.bottom = "7%"
      }
      else{
        if (this.auth) {
          this.mess.nativeElement.style.bottom = "7%"
        }
      }
    }
    else {
      this.toTop.nativeElement.style.display = "none"
      if (this.resTourBooking) {
        if (this.auth) {
          this.mess.nativeElement.style.bottom = "7%"
        }
        this.cardH.nativeElement.style.bottom = "1%"
      }
      else{
        if (this.auth) {
          this.mess.nativeElement.style.bottom = "1%"
        }
      }
    }
  }
  loadMessageSignalR(){
      this.navbarComponent.hubConnectionBuilder.on('Message', (result: any) => {
        this.initChat();
      })
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

  initBanner(){
    this._bannerService.GetBannerAll().subscribe(res => {
      this.response = res
      this.resListImage = this.response.content

    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
  initFlashSale() {
    this.scheduleService.getsScheduleFlashSale(this.pageIndex, this.pageSize).then(res => {

      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resScheduleFalshSale = this.response.content

        this.resScheduleFalshSale.forEach(schedule => {
          if (schedule.isHoliday) {
            schedule.priceFlashSale = this.formatPrice(schedule.finalPriceHoliday - (schedule.finalPriceHoliday * this.valueFalshSale / 100))
          }
          else {
            schedule.priceFlashSale = this.formatPrice(schedule.finalPrice - (schedule.finalPrice * this.valueFalshSale / 100))
          }
          var days = (schedule.endDate - new Date().getTime()) / (1000 * 3600 * 24);
          schedule.outOfTime = Math.abs(days)

          schedule.countdownConfig = this.countDownTime(schedule.outOfTime)
          var createDate = new Date(schedule.tour.createDate)

          schedule.tour.createDateAfter30Day = new Date(schedule.tour.createDate).setDate(createDate.getDate() + 30);
        });

      }
    }, error => {
      console.log(error);

      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initSchedule() {
    this.scheduleService.getsSchedule(this.pageIndex, this.pageSize).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resSchedule = this.response.content
        this.resSchedule.forEach(schedule => {
          var createDate = new Date(schedule.tour.createDate)

          schedule.tour.createDateAfter30Day = new Date(schedule.tour.createDate).setDate(createDate.getDate() + 30);
        });
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
            schedule.pricePromotion = this.formatPrice(schedule.finalPriceHoliday - (schedule.finalPriceHoliday * schedule.valuePromotion / 100))
          }
          else {
            schedule.pricePromotion = this.formatPrice(schedule.finalPrice - (schedule.finalPrice * schedule.valuePromotion / 100))
          }

          var createDate = new Date(schedule.tour.createDate)

          schedule.tour.createDateAfter30Day = new Date(schedule.tour.createDate).setDate(createDate.getDate() + 30);
        });
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initTour() {
    this.tourService.getsTourByRating(this.pageIndex, this.pageSize).then(res => {
      this.response = res
      console.log(res);

      if (this.response.notification.type == StatusNotification.Success) {
        this.resTour = this.response.content
        this.resTour.forEach(tour => {
          tour.schedules.forEach(schedule => {
            if (schedule.promotions.idPromotion != 1) {
              if (schedule.isHoliday) {
                schedule.pricePromotion = this.formatPrice(schedule.finalPriceHoliday - (schedule.finalPriceHoliday * schedule.promotions.value / 100))
              }
              else {
                schedule.pricePromotion = this.formatPrice(schedule.finalPrice - (schedule.finalPrice * schedule.promotions.value / 100))
              }
            }
            var createDate = new Date(tour.createDate)

            tour.createDateAfter30Day = new Date(tour.createDate).setDate(createDate.getDate() + 30);
          })
          tour.schedules.unshift(Object.assign({}, tour.schedules[0]))
        });
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

  searchBookingNo(){
    if(this.kwBookingNo == ""){
      this.notificationService.handleAlert("Bạn cần nhập BookingNo !", StatusNotification.Warning)
    }
    else{
      this.tourbookingService.cusSearchBookingNo(this.kwBookingNo).subscribe(res => {
        this.response = res
        if (this.response.notification.type == StatusNotification.Success) {
          this.tourBookingNo = this.response.content
          this.kwBookingNo = ""
          this.billDetail(this.tourBookingNo.idTourBooking)
        }
        else{
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }

  }

  billDetail(idTourBooking: string){
    location.assign(this.configService.clientUrl + "/bill/" + idTourBooking)
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
            if (!item.isSeen && item.receiverId == this.auth.id) {
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
              for (let index = 0; index <  this.resMess.length; index++) {
                document.getElementsByClassName("chat-container")[index].setAttribute("style", "height: " + (document.getElementsByClassName("chat-content")[index].clientHeight+5) + "px")
              }
              document.getElementById("mess").scrollTop = document.getElementById("mess").scrollHeight
            }, 1);
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
    if (this.dataSend.content) {
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

  seeMoreCommon(){
    var kw = "common"
    this.router.navigate(['', 'tour', kw]);
  }

  seeMoreRating(){
    var kw = "from=" + 'Hồ Chí Minh' + "&to=" + '' + "&departureDate=" + '' + "&returnDate=" + ''
    this.router.navigate(['', 'tour', kw]);
  }

  seeMorePromotion(){
    var kw = "promotion"
    this.router.navigate(['', 'tour', kw]);
  }

  formatPrice(priceInput: any){
    var price = Number(priceInput).toLocaleString('en-GB');
    var formatNumber = price.toString()
    var arPrice = formatNumber.split(",")
    var replaceNumberEnd = arPrice[arPrice.length - 1]
    var lengthArPrice = arPrice.length
    var a = []
    replaceNumberEnd = "000"
    for(let i = 0; i <lengthArPrice; i++){
      if(i == lengthArPrice - 1){
        arPrice[i] = replaceNumberEnd
      }
      a.push(arPrice[i])
    }
    var priceEnd = a.join()
    var withoutCommas = Number(priceEnd.replace(/,/g, ''));
    return withoutCommas
  }
}

