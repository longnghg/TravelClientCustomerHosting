export class VoucherModel{
 idVoucher: string
  code: string
  startDate: number
  endDate: number
  value : number
  startDateDisplay: string
  endDateDisplay: string
  IdUserModify: string
  rowNum: number = 0
}

interface IObjectKeys {
  [key: string]: string | number;
}
