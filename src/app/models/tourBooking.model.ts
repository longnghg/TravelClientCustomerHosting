import { TourBookingDetailModel } from "../models/tourBookingDetail.model";

export class TourBookingModel{
  idTourBooking: string = ""
  nameCustomer: string = ""
  address: string = ""
  email: string = ""
  phone: string = ""
  nameContact: string = ""

  baby: number = 0
  child: number = 0
  adult: number = 1

  status: number = 1
  paymentId: number = 1
  scheduleId: string = ""

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
}
