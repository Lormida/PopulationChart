export interface IDataCountry {
  countryCode: string
  countryName: string
  isoa2: string
  score: string
  shortName: string
}

export interface IDataByCountryCodeAndYear {
  countryCode: number
  countryName: string
  isoa2: string
  record: string
  shortName: string
  value: number
  year: number
}
