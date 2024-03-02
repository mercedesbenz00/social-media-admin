import { useCitiesStore } from "@/data/cities/cities.store"

export async function useLocation(cityId: number) {
  const { getCities } = useCitiesStore()
  const cities = await getCities()
  if (cities?.length) {
    const city = cities.filter((c) => c.id === cityId)
    if (city.length) {
      return city[0].name
    }
  }
  return cityId
}
