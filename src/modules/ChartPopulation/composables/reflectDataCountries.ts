import { IDataByCountryCodeAndYear } from '../types'
import { IPropsChartPopulationRow } from '../types/propsChartPopulationRow.type'

export async function reflectDataCountries(
  updateDataCountries: (newDataCountries: IPropsChartPopulationRow[]) => void,
  updatedDataByCountriesByYear: (IDataByCountryCodeAndYear | null)[]
) {
  const draftData = (updatedDataByCountriesByYear.filter((el) => !!el) as IDataByCountryCodeAndYear[])
    .map((dataCountry) => ({
      country: dataCountry.countryName,
      populationAmount: dataCountry.value,
    }))
    .sort((a, b) => (a.populationAmount > b.populationAmount ? -1 : 1))

  const maxPopulationPerThisYear = Math.max(...draftData.map((el) => el.populationAmount))

  const dataCountries = draftData.map((el) => ({
    ...el,
    contentData: +((el.populationAmount / maxPopulationPerThisYear) * 100).toPrecision(2),
  }))

  updateDataCountries(dataCountries)
}
