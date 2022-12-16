import { TourDetailModel } from "./tourDetail.model";
import { ScheduleModel } from "./schedule.model";

export class TourModel{
  idTour: string = ""
  nameTour: string = ""
  thumbnail: string = ""
  rating: number = 0
  fromPlace: string = ""
  toPlace: string = ""
  approveStatus: number = 0
  status: string = ""
  createDate: number = 0
  modifyBy: string = ""
  modifyDate: number = 0
  // idReview: string
  isDelete: boolean = false
  isActive: boolean = true
  createDateAfter30Day: number
  tourDetail: TourDetailModel = new TourDetailModel()
  schedules: ScheduleModel[]
}
