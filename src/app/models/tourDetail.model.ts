import { CostTourModel } from "../models/costTour.model";
export class TourDetailModel{
  idTourDetail: string
  tourId: string
  description: string
  quantityBooked: number
  totalCostTour: number
  profit: number
  vat: number
  finalPrice: number
  finalPriceHoliday: number

  costTour: CostTourModel

  priceChild: number
  priceBaby: number
  priceAdult: number
  priceChildPromotion: number
  priceBabyPromotion: number
  priceAdultPromotion: number

}
