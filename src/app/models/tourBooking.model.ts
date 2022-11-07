import { PaymentModel } from "../models/payment.model";
import { TourBookingDetailModel } from "../models/tourBookingDetail.model";
import { ScheduleModel } from "../models/schedule.model";
export class TourBookingModel{
  idTourBooking: string = ""
  customerId: string = ""
  nameCustomer: string = ""
  address: string = ""
  email: string = ""
  phone: string = ""
  nameContact: string = ""

  baby: number = 0
  child: number = 0
  adult: number = 1

  status: number = 1
  tourBookingDetails: TourBookingDetailModel
  paymentId: number = 1
  payment: PaymentModel
  scheduleId: string = ""
  tourName: string = ""
  alias: string = ""

  hotelId: string = ""
  restaurantId: string = ""
  placeId: string = ""

  dateBooking: number = 0
  lastDate: number = 0
  vat: number = 10

  pincode: string = ""
  voucherCode: string = ""
  bookingNo: string = ""

  isCalled: number = 0
  deposit: number = 0

  remainPrice: number = 0
  totalPrice: number = 0

  modifyBy: string = ""
  modifyDate: number = 0

  schedule: ScheduleModel
}


export class ValidationTourBookingModel {
  total: number = 0
  nameCustomer: string = ""
  nameContact: string = ""
  phone: string = ""
  email: string = ""
}

