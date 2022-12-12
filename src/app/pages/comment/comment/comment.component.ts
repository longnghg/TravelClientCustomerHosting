import { Component, OnInit, ViewChild, Input, ElementRef, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { CommentModel, ValidationCommentModel, ValidationCommentTextModel } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services_API/comment.service';
import { ConfigService } from "../../../services_API/config.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ResponseModel } from 'src/app/models/responsiveModels/response.model';
import { StatusBooking, StatusNotification } from "../../../enums/enum";
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @ViewChild( 'editor' ) editorComponent: CKEditorComponent;
  @ViewChild('closeModal') closeModal: ElementRef

  @Input() idSchedule: any
  @Input() idTourBooking: any
  @Input() nameTour: any
  response: ResponseModel
  public Editor = ClassicEditor;
  isloading = false

  validateComment: ValidationCommentModel = new ValidationCommentModel
  validateCommentText:  ValidationCommentTextModel = new  ValidationCommentTextModel
  resCmt: CommentModel = new CommentModel
  currentRate = 5;
  constructor(private commentService: CommentService,private notificationService: NotificationService, private configService: ConfigService, config: NgbRatingConfig) {
    config.max = 10;
    config.readonly = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.currentRate = 5
  }

  clear(){
    this.editorComponent.editorInstance.setData("")
  }

  createComment(){
    var idCustomer = localStorage.getItem("idUser")
    this.validateComment = new ValidationCommentModel
    this.validateComment = this.configService.validateComment(this.resCmt, this.validateComment)

    if(this.validateComment.total == 0 ){
      this.validateCommentText = this.configService.validateCommentText(this.resCmt, this.validateCommentText)
      this.resCmt.idSchedule = this.idSchedule
      this.resCmt.idCustomer = idCustomer
      this.resCmt.idTourBooking = this.idTourBooking
      this.resCmt.rating = this.currentRate
      this.isloading = true
      this.commentService.create(this.resCmt).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        if(this.response.notification.type == StatusNotification.Success)
        {
		      this.resCmt = Object.assign({}, new CommentModel)
          this.validateComment = new ValidationCommentModel
          this.editorComponent.editorInstance.setData("")
          setTimeout(() => {
            this.closeModal.nativeElement.click()
          }, 100);
        }
          }, error => {
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }
}
