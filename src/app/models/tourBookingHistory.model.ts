export class TourBookingHistoryModel{
  idSchedule: string = ""
  idTourBooking: string = ""
  nameTour: string = ""
  baby: number = 0
  child: number = 0
  adult: number = 0
  totalPeople: number = 0
  status: number = 0
  statusName: string = ""
  dateBooking: number = 0
  departureDate: number = 0
  returnDate: number = 0
  thumbnail: string = ""
  description: string = ""
  rowNum: number = 0
  totalPrice: number = 0
  valuePromotion: number = 0
  fromPlace: string
  toPlace: string
  isSendFeedBack: boolean
}
