import { Component, OnInit,AfterContentInit,Input, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Pipe, PipeTransform  } from '@angular/core';
import { ScheduleService } from "../../../services_API/schedule.service";
import { ScheduleModel } from "../../../models/schedule.model";
import { CommentModel, ValidationCommentModel,  ValidationCommentTextModel } from "../../../models/comment.model";
import { CommentService } from 'src/app/services_API/comment.service';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { getLocaleDateFormat } from '@angular/common';
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services_API/image.service';
import { TimeLineModel } from 'src/app/models/timeLine.model';
import { TimelineService } from 'src/app/services_API/timeline.service';
import { Daily } from "../../../models/weather.model";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from 'src/app/services_API/new.service';
import { DatumModel } from 'src/app/models/location.model';
import "bingmaps";
import { BingMapsAPILoader } from "src/assets/ts/BingMapsApiLoader";
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})

export class TourDetailComponent implements OnInit {
  resWeather: Daily[]
  resSchedule: ScheduleModel
  resSchedules: ScheduleModel[]
  resScheduleRelate: ScheduleModel[]
  resTimeline: TimeLineModel []
  resComment: CommentModel []
  lengthComment: any
  resCmt: CommentModel = new CommentModel
  resImage: ImageModel[]
  imgDetail: any[] = []
  response: ResponseModel
  auth: AuthenticationModel
  idComment: string
  idCus: string
  weatherResponse: any
  validateComment: ValidationCommentModel = new ValidationCommentModel
  validateCommentText:  ValidationCommentTextModel = new  ValidationCommentTextModel
  createDateAfter30Day: any
  dateNow: any
  imgNew = "assets/images/icons/new.png"
  commentText: string = ""
  language = this.configService.listLanguage()
  fromLang: string = "vi"
  toLang: string = "en"
  translateText: string = ""
  resDatum: DatumModel
  constructor(private scheduleService: ScheduleService,
    private notificationService: NotificationService,
    private configService: ConfigService,
    private imageService: ImageService,
    private timelineService: TimelineService,
    private activatedRoute: ActivatedRoute, private router: Router, private commentService: CommentService, private newService: NewsService,
    config: NgbRatingConfig,private loader: BingMapsAPILoader) { config.readonly = true;}
  url = this.configService.apiUrl

  public Editor = ClassicEditor;

  protected initMap(lat:number, lon:number) {
    const options: Microsoft.Maps.IMapLoadOptions = {
      center: new Microsoft.Maps.Location(lat, lon),
      zoom:30,
      showBreadcrumb:true,
      supportedMapTypes: [Microsoft.Maps.MapTypeId.mercator]  ,
      credentials:
        "AurdciAAYASX5yphI9uZpd8We8kuWNrzLMOoxXNaaUJokJMi1BbNsDy3NJLjzIOR"
    };

    const map = new Microsoft.Maps.Map(document.getElementById("map"), options);
  }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.init(this.activatedRoute.snapshot.paramMap.get('id1'))
    this.initScheduleRelated(this.activatedRoute.snapshot.paramMap.get('id1'))

    var date = Date.now()
    this.dateNow = new Date(date).getTime()
  }

  displayMap(lat:number, lon:number){
    this.loader.load("bingAPIReady").then(() => this.initMap(lat, lon));
  }
 init(idSchedule: string){
    this.scheduleService.getsSchedulebyIdSchedule(idSchedule).then(res => {
      this.response = res

      if (this.response.notification.type == StatusNotification.Success) {

        this.resSchedule = this.response.content
        if(this.resSchedule){
          var createDate = new Date(this.resSchedule.tour.createDate)
          this.createDateAfter30Day = new Date(this.resSchedule.tour.createDate).setDate(createDate.getDate() + 30);
        }
        this.initWeather()
        this.mapLocation(this.resSchedule.tour.toPlace)
        if (this.resSchedule.promotions.idPromotion != 1) {
          if (this.resSchedule.isHoliday) {
            this.resSchedule.pricePromotion = this.resSchedule.finalPriceHoliday - (this.resSchedule.finalPriceHoliday * this.resSchedule.promotions.value /100)
            this.resSchedule.priceAdultPromotion = this.resSchedule.priceAdultHoliday - (this.resSchedule.priceAdultHoliday * this.resSchedule.promotions.value /100)
              this.resSchedule.priceChildPromotion = this.resSchedule.priceChildHoliday - (this.resSchedule.priceChildHoliday * this.resSchedule.promotions.value /100)
              this.resSchedule.priceBabyPromotion = this.resSchedule.priceBabyHoliday - (this.resSchedule.priceBabyHoliday * this.resSchedule.promotions.value /100)
          }
          else{
            this.resSchedule.pricePromotion = this.resSchedule.finalPrice - (this.resSchedule.finalPrice * this.resSchedule.promotions.value /100)
            this.resSchedule.priceAdultPromotion = this.resSchedule.priceAdult - (this.resSchedule.priceAdult * this.resSchedule.promotions.value /100)
              this.resSchedule.priceChildPromotion = this.resSchedule.priceChild - (this.resSchedule.priceChild * this.resSchedule.promotions.value /100)
              this.resSchedule.priceBabyPromotion = this.resSchedule.priceBaby - (this.resSchedule.priceBaby * this.resSchedule.promotions.value /100)
          }

        }

        this.scheduleService.getsSchedulebyIdTour(this.resSchedule.tour.idTour).then(res => {
          this.response = res
          if (this.response.notification.type == StatusNotification.Success) {
            this.resSchedules = this.response.content

            this.resSchedules.forEach(schedule => {
             if (schedule.promotions.idPromotion != 1) {
              if (schedule.isHoliday) {
                schedule.pricePromotion = schedule.finalPriceHoliday - (schedule.finalPriceHoliday * this.resSchedule.promotions.value /100)
              }
              else{
                schedule.pricePromotion = schedule.finalPrice - (schedule.finalPrice * this.resSchedule.promotions.value /100)
              }
             }
            });

          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })

        this.commentService.gets(this.resSchedule.tour.idTour).subscribe(res => {
          this.response = res
          if(this.response.notification.type == StatusNotification.Success){
            this.resComment = this.response.content
          }
          this.lengthComment = this.resComment.length
        })

        // this.commentService.getidCus(this.auth.id).subscribe(res => {
        //   this.response = res
        //   if(this.response.notification.type == StatusNotification.Success){
        //     this.idCus = this.response.content
        //   }
        // })
        this.initImage(this.resSchedule.tour.idTour)

        this.initTimeline(this.resSchedule.idSchedule)
      }
      else{
         location.assign(this.configService.clientUrl + "/page404")
      }



    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initScheduleRelated(idSchedule: string){
    this.scheduleService.getsScheduleRelatebyIdSchedule(idSchedule, 1, 4).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resScheduleRelate = this.response.content
        this.resScheduleRelate.forEach(schedule => {
          if (schedule.promotionId != 1) {
            if (schedule.isHoliday) {

              schedule.pricePromotion = schedule.finalPriceHoliday - (schedule.finalPriceHoliday * schedule.valuePromotion /100)
            }
            else{
              schedule.pricePromotion = schedule.finalPrice - (schedule.finalPrice * schedule.valuePromotion /100)
            }
          }

          var createDate = new Date(schedule.tour.createDate)
          schedule.tour.createDateAfter30Day = new Date(schedule.tour.createDate).setDate(createDate.getDate() + 30);
        });
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  mapLocation(locationString: string){
    this.newService.mapLocation(locationString).subscribe(res => {
      this.response = res

      if (this.response.notification.type == StatusNotification.Success) {
        this.resDatum = this.response.content
        this.displayMap(this.resDatum.latitude, this.resDatum.longitude)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  scheduleChange(departureDate: any){
    var tour = this.resSchedule.tour
    this.resSchedules.forEach(schedule => {
      if (schedule.departureDate == departureDate) {
        schedule.tour = tour
        // this.resSchedule.returnDate = schedule.returnDate
        // this.resSchedule.idSchedule = schedule.idSchedule
        // this.resSchedule.description = schedule.description
        // this.resSchedule.departurePlace = schedule.departurePlace
        // this.resSchedule.alias = schedule.alias
        // this.resSchedule.isHoliday = schedule.isHoliday
        // this.resSchedule.finalPrice = schedule.finalPrice
        // this.resSchedule.finalPriceHoliday = schedule.finalPriceHoliday
        // this.resSchedule.isHoliday = schedule.isHoliday
        // this.resSchedule.priceAdult = schedule.priceAdult
        // this.resSchedule.priceAdultHoliday = schedule.priceAdultHoliday
        // this.resSchedule.priceChild = schedule.priceChild
        // this.resSchedule.priceChildHoliday = schedule.priceChildHoliday
        // this.resSchedule.priceBaby = schedule.priceBaby
        // this.resSchedule.priceBabyHoliday = schedule.priceBabyHoliday
        // this.resSchedule.additionalPrice = schedule.additionalPrice
        // this.resSchedule.additionalPriceHoliday = schedule.additionalPriceHoliday
        this.resSchedule = Object.assign({}, schedule)
        if (this.resSchedule.promotions.idPromotion != 1) {
          if (this.resSchedule.isHoliday) {
            this.resSchedule.pricePromotion = this.resSchedule.finalPriceHoliday - (this.resSchedule.finalPriceHoliday * this.resSchedule.promotions.value /100)
            this.resSchedule.priceAdultPromotion = this.resSchedule.priceAdultHoliday - (this.resSchedule.priceAdultHoliday * this.resSchedule.promotions.value /100)
              this.resSchedule.priceChildPromotion = this.resSchedule.priceChildHoliday - (this.resSchedule.priceChildHoliday * this.resSchedule.promotions.value /100)
              this.resSchedule.priceBabyPromotion = this.resSchedule.priceBabyHoliday - (this.resSchedule.priceBabyHoliday * this.resSchedule.promotions.value /100)
          }
          else{
            this.resSchedule.pricePromotion = this.resSchedule.finalPrice - (this.resSchedule.finalPrice * this.resSchedule.promotions.value /100)
            this.resSchedule.priceAdultPromotion = this.resSchedule.priceAdult - (this.resSchedule.priceAdult * this.resSchedule.promotions.value /100)
              this.resSchedule.priceChildPromotion = this.resSchedule.priceChild - (this.resSchedule.priceChild * this.resSchedule.promotions.value /100)
              this.resSchedule.priceBabyPromotion = this.resSchedule.priceBaby - (this.resSchedule.priceBaby * this.resSchedule.promotions.value /100)
          }
        }
      }
    });


  }

  initImage(idTour: string){
    this.imageService.getsbyidTour(idTour).subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resImage = this.response.content

        this.resImage.forEach(image => {
          if (image.filePath) {
            this.imgDetail.push(image.filePath)
          }
        });

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initTimeline(idTour: string){
    this.timelineService.getTimelineidSchedule(idTour).subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resTimeline = this.response.content
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  booking(idSchedule: string, alias: string){
    localStorage.removeItem("tourBooking_" + localStorage.getItem("idUser"))
    this.router.navigate(['','tour-booking',idSchedule, alias]);
  }

  initWeather(){
    this.scheduleService.weather(this.resSchedule.tour.toPlace).then(res =>{
      this.response = res

      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resWeather = this.response.content.daily
        this.resWeather.forEach(daily => {
          daily.dt = Number(daily.dt + '000')
        });
        console.log(this.resWeather);
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  goto(idSchedule: string, alias: string){
    // location.reload()
    location.assign(this.configService.clientUrl + "/tour-detail/"+idSchedule+"/"+alias)
  }


  getData(idComment: string){
    this.idComment = idComment
  }

  getCmtText(cmtText: string){
    this.commentText = cmtText
  }

  deleteComment(){
    this.commentService.delete(this.idComment, this.auth.id).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.notificationService.handleAlert("Xóa thành công !", StatusNotification.Success)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  repeatLang(){
    var from = this.fromLang
    var to = this.toLang

    this.fromLang = to
    this.toLang = from
  }

  changeLaguage(){

    if(this.fromLang != null && this.toLang != null){
      this.newService.translateLanguage(this.commentText, this.fromLang, this.toLang).subscribe(res =>{
        this.response = res
        this.translateText = this.response.content
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }

  }

}


