import { useAsyncData } from "./useAsyncData";
import { fetchCitySnapshot } from "@/services/api";
import { computeCitySnapshot } from "@/utils/simulation";

/** Live weather/air/availability snapshot for the selected location. */
export function useCitySnapshot(location: string, refreshTrigger: number) {
  const initial = computeCitySnapshot(location, refreshTrigger);
  return useAsyncData(
    () => fetchCitySnapshot(location, refreshTrigger),
    initial,
    [location, refreshTrigger],
  );
}