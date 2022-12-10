import { Component, OnInit,Input, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Pipe, PipeTransform  } from '@angular/core';
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

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  resSchedule: ScheduleModel
  resSchedules: ScheduleModel[]
  resScheduleRelate: ScheduleModel[]
  resTimeline: TimeLineModel []
  resComment: CommentModel []
  resCmt: CommentModel = new CommentModel
  resImage: ImageModel[]
  imgDetail: any[] = []
  response: ResponseModel
  auth: AuthenticationModel
  idComment: string
  idCus: string
  validateComment: ValidationCommentModel = new ValidationCommentModel
  validateCommentText:  ValidationCommentTextModel = new  ValidationCommentTextModel
  constructor(private scheduleService: ScheduleService,
    private notificationService: NotificationService,
    private configService: ConfigService,
    private imageService: ImageService,
    private timelineService: TimelineService,
    private activatedRoute: ActivatedRoute, private router: Router, private commentService: CommentService) { }
  url = this.configService.apiUrl

  public Editor = ClassicEditor;

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.init(this.activatedRoute.snapshot.paramMap.get('id1'))
    this.initScheduleRelated(this.activatedRoute.snapshot.paramMap.get('id1'))
  }



 init(idSchedule: string){
    this.scheduleService.getsSchedulebyIdSchedule(idSchedule).then(res => {
      this.response = res
      console.log(res);

      if (this.response.notification.type == StatusNotification.Success) {
        this.resSchedule = this.response.content

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
        });
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
        console.log(this.resTimeline);

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

  goto(idSchedule: string, alias: string){
    // location.reload()
    location.assign(this.configService.clientUrl + "/tour-detail/"+idSchedule+"/"+alias)
  }


  getData(idComment: string){
    this.idComment = idComment
  }

  deleteComment(){
    this.commentService.delete(this.idComment, this.auth.id).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

}

