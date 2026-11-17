import type { CitySnapshot, ForecastDay, HourlyForecast } from "@/types";
import { computeCitySnapshot } from "@/utils/simulation";
import { forecastDays, hourlyForecast } from "@/data/weather";
import { mockRequest } from "./client";

export function fetchCitySnapshot(
  location: string,
  refreshTrigger: number,
): Promise<CitySnapshot> {
  return mockRequest(computeCitySnapshot(location, refreshTrigger));
}

export function fetchForecast(): Promise<ForecastDay[]> {
  return mockRequest(forecastDays);
}

export function fetchHourlyForecast(): Promise<HourlyForecast[]> {
  return mockRequest(hourlyForecast);
}