
import { PromotionModel } from "./promotion.model";
import { TimeLineModel } from "./timeLine.model";
import { TourModel } from "./tour.model";
export class ScheduleModel{
  idSchedule: string = ""

  alias: string = ""
  departureDate: string = ""
  returnDate: string = ""
  beginDate: number = 0
  endDate: number = 0
  timePromotion: number = 0

  status: number = 0
  quantityAdult: number = 0
  quantityBaby: number = 0
  quantityChild: number = 0
  minCapacity: number = 0
  maxCapacity: number = 0

  tourId: string = ""
  nameTour: string = ""

  carId: string = ""
  liscensePlate: string = ""
  nameDriver:string = ""

  employeeId: string = ""
  nameEmployee:string = ""

  promotionId: string = ""
  valuePromotion: number = 0

  totalCostTour: number = 0
  profit: number = 0
  vat: number = 0

  additionalPrice: number = 0
  additionalPriceHoliday: number = 0

  finalPrice: number = 0
  finalPriceHoliday: number = 0

  adultPrice: number = 0
  childPrice: number = 0
  babyPrice: number = 0

  isHoliday: boolean = false
  tour: TourModel = new TourModel
  timeLine: TimeLineModel[]

  description:string = ""
}
