export class LocationModel{
  nameProvince?: string = null
  nameDistrict?: string = null
  nameWard?: string = null

  provinceName?: string = null
  districtName?: string = null
  wardName?: string = null

  idProvince?: string = null
  idDistrict?: string = null
  idWard?: string = null

  total?: number = 0
}

export class DatumModel{
  latitude : number
  longitude : number
  type : string
  name : string
  number : string
  postal_code : string
  country_code : string
}
