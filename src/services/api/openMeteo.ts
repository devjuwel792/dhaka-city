import type { ApiResponse } from "@/types/api";
import { API_ENDPOINTS, DHAKA_COORDS } from "@/config/api";
import { request } from "./http";
import {
  assertRecord,
  isFiniteNumber,
  isFiniteNumberArray,
  isString,
  isStringArray,
  ValidationError,
} from "./validators";

export interface OpenMeteoCurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface OpenMeteoDailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface OpenMeteoWeather {
  current: OpenMeteoCurrentWeather;
  daily?: OpenMeteoDailyForecast;
}

export interface OpenMeteoAirQuality {
  current: {
    time: string;
    european_aqi: number;
    us_aqi: number;
    pm2_5: number;
    pm10: number;
    nitrogen_dioxide: number;
    ozone: number;
    sulphur_dioxide: number;
  };
}

export interface OpenMeteoOptions {
  signal?: AbortSignal;
  ttlMs?: number;
  retries?: number;
  timeoutMs?: number;
}

const WEATHER_TTL = 10 * 60 * 1000;
const AIR_QUALITY_TTL = 15 * 60 * 1000;

function validateDaily(raw: unknown): OpenMeteoDailyForecast | undefined {
  if (raw === undefined || raw === null) return undefined;
  const daily = assertRecord(raw, "daily");
  if (
    !isStringArray(daily.time) ||
    !isFiniteNumberArray(daily.temperature_2m_max) ||
    !isFiniteNumberArray(daily.temperature_2m_min)
  ) {
    throw new ValidationError("daily arrays are missing or malformed");
  }
  return {
    time: daily.time,
    weather_code: isFiniteNumberArray(daily.weather_code) ? daily.weather_code : [],
    temperature_2m_max: daily.temperature_2m_max,
    temperature_2m_min: daily.temperature_2m_min,
  };
}

export function validateWeather(raw: unknown): OpenMeteoWeather {
  const root = assertRecord(raw, "root");
  const current = assertRecord(root.current, "current");

  if (!isFiniteNumber(current.temperature_2m)) {
    throw new ValidationError("current.temperature_2m must be a finite number");
  }

  return {
    current: {
      time: isString(current.time) ? current.time : "",
      temperature_2m: current.temperature_2m,
      relative_humidity_2m: isFiniteNumber(current.relative_humidity_2m)
        ? current.relative_humidity_2m
        : 0,
      apparent_temperature: isFiniteNumber(current.apparent_temperature)
        ? current.apparent_temperature
        : current.temperature_2m,
      weather_code: isFiniteNumber(current.weather_code) ? current.weather_code : 0,
      wind_speed_10m: isFiniteNumber(current.wind_speed_10m) ? current.wind_speed_10m : 0,
    },
    daily: validateDaily(root.daily),
  };
}

export function validateAirQuality(raw: unknown): OpenMeteoAirQuality {
  const root = assertRecord(raw, "root");
  const current = assertRecord(root.current, "current");

  if (!isFiniteNumber(current.european_aqi) && !isFiniteNumber(current.us_aqi)) {
    throw new ValidationError("current air-quality index is missing");
  }

  return {
    current: {
      time: isString(current.time) ? current.time : "",
      european_aqi: isFiniteNumber(current.european_aqi) ? current.european_aqi : 0,
      us_aqi: isFiniteNumber(current.us_aqi) ? current.us_aqi : 0,
      pm2_5: isFiniteNumber(current.pm2_5) ? current.pm2_5 : 0,
      pm10: isFiniteNumber(current.pm10) ? current.pm10 : 0,
      nitrogen_dioxide: isFiniteNumber(current.nitrogen_dioxide) ? current.nitrogen_dioxide : 0,
      ozone: isFiniteNumber(current.ozone) ? current.ozone : 0,
      sulphur_dioxide: isFiniteNumber(current.sulphur_dioxide) ? current.sulphur_dioxide : 0,
    },
  };
}

export function getWeather(
  lat: number = DHAKA_COORDS.lat,
  lon: number = DHAKA_COORDS.lon,
  options: OpenMeteoOptions = {},
): Promise<ApiResponse<OpenMeteoWeather>> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
  });

  return request<OpenMeteoWeather>({
    url: `${API_ENDPOINTS.openMeteo.weather}?${params.toString()}`,
    source: API_ENDPOINTS.openMeteo.source,
    validate: validateWeather,
    ttlMs: options.ttlMs ?? WEATHER_TTL,
    retries: options.retries,
    timeoutMs: options.timeoutMs,
    signal: options.signal,
  });
}

export function getAirQuality(
  lat: number = DHAKA_COORDS.lat,
  lon: number = DHAKA_COORDS.lon,
  options: OpenMeteoOptions = {},
): Promise<ApiResponse<OpenMeteoAirQuality>> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "european_aqi,us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,sulphur_dioxide",
    timezone: "auto",
  });

  return request<OpenMeteoAirQuality>({
    url: `${API_ENDPOINTS.openMeteo.airQuality}?${params.toString()}`,
    source: API_ENDPOINTS.openMeteo.source,
    validate: validateAirQuality,
    ttlMs: options.ttlMs ?? AIR_QUALITY_TTL,
    retries: options.retries,
    timeoutMs: options.timeoutMs,
    signal: options.signal,
  });
}