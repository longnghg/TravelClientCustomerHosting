
import { PromotionModel } from "./promotion.model";
import { TimeLineModel } from "./timeLine.model";
import { TourModel } from "./tour.model";
export class ScheduleModel{
  idSchedule: string = ""
  departureDate: string = ""
  departureDateDisplay: string = ""
  beginDate: number = 0
  endDate: number = 0
  timePromotion: number = 0

  status: number = 0
  finalPrice: number = 0
  quantityAdult: number = 0
  quantityBaby: number = 0
  minCapacity: number = 0
  maxCapacity: number = 0
  quantityChild: number = 0

  tourId: string = ""
  nameTour: string = ""

  carId: string = ""
  liscensePlate: string = ""
  nameDriver:string = ""

  employeeId: string = ""
  nameEmployee:string = ""

  promotionId: string = ""
  valuePromotion: number = 0

  tour: TourModel = new TourModel
  timeLine: TimeLineModel[]
}
