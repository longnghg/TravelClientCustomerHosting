
import { PromotionModel } from "./promotion.model";
import { TimeLineModel } from "./timeLine.model";
import { CostTourModel } from "./costTour.model";
import { TourModel } from "./tour.model";
import { CountdownConfig } from 'ngx-countdown';
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
  valuePromotion: number = 0
  pricePromotion: number = 0
  promotionId: number = 0

  promotions: PromotionModel = new PromotionModel

  priceFlashSale: number = 0
  timeFlashSale: number = 0

  costTour: CostTourModel = new CostTourModel

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


  totalCostTourNotService: number = 0
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

  priceAdultPromotion: number = 0
  priceChildPromotion: number = 0
  priceBabyPromotion: number = 0

  isHoliday: boolean = false
  tour: TourModel = new TourModel
  timeLines: TimeLineModel[]

  description:string = ""

  countdownConfig: CountdownConfig
  outOfTime: number = 0
}

export class SearchScheduleFilter{
  kwFrom: any = "TP Hồ Chí Minh"
  kwTo: any = null
  kwDepartureDate: any = ""
  kwReturnDate: any =""
  kwPriceFrom: any = ""
  kwPriceTo: any = ""
  kwPromotion: any = ""
}
