
import { PromotionModel } from "./promotion.model";
import { TimeLineModel } from "./timeLine.model";
export class ScheduleModel{
  idSchedule: string
  departureDate: string
  beginDate: number
  endDate: number
  timePromotion: number
  status: number
  finalPrice: number
  quantityAdult: number
  quantityBaby: number
  minCapacity: number
  maxCapacity: number
  quantityChild: number
  tourId: string
  nameTour: string
  carId: string
  liscensePlate: string
  nameDriver:string
  employeeId: string
  nameEmployee:string
  promotionId: string
  valuePromotion: number
  promotion: PromotionModel
  timeLine: TimeLineModel
}
