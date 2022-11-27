export class VoucherModel{
 idVoucher: string
  code: string
  startDate: number
  endDate: number
  value : string
  startDateDisplay: string
  endDateDisplay: string
  IdUserModify: string
}

interface IObjectKeys {
  [key: string]: string | number;
}
