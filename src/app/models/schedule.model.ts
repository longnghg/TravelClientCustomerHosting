
import { PromotionModel } from "./promotion.model";
import { TimeLineModel } from "./timeLine.model";
import { TourModel } from "./tour.model";
export class ScheduleModel{
  rowNum: number = 0
  idSchedule: string = ""

  alias: string = ""

  departurePlace: string = ""
  departureDate: string = ""
  returnDate: string = ""
  beginDate: number = 0
  endDate: number = 0
  timePromotion: number = 0

  status: number = 0
  quantityAdult: number = 0
  quantityBaby: number = 0
  quantityChild: number = 0
  quantityCustomer: number = 1
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

  priceAdult: number = 0
  priceChild: number = 0
  priceBaby: number = 0

  priceAdultHoliday: number = 0
  priceChildHoliday: number = 0
  priceBabyHoliday: number = 0

  isHoliday: boolean = false
  tour: TourModel = new TourModel
  timeLine: TimeLineModel[]

  description:string = ""
}
