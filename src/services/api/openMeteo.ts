import type { ApiResponse } from "@/types/api";
import { API_ENDPOINTS, DHAKA_COORDS } from "@/config/api";
import { request } from "./http";
import {
  assertRecord,
  isFiniteNumber,
  isFiniteNumberArray,
  isRecord,
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

// ───────────────────────────────────────────────────────────────────────────
// Full weather bundle (all dashboard fields), timezone Asia/Dhaka, 7-day.
// ───────────────────────────────────────────────────────────────────────────

export interface WeatherBundleCurrent {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  weatherCode: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number; // meters
  isDay: boolean;
}

export interface WeatherBundleHourly {
  time: string;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
}

export interface WeatherBundleDaily {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationProbabilityMax: number;
}

export interface WeatherBundle {
  current: WeatherBundleCurrent;
  hourly: WeatherBundleHourly[];
  daily: WeatherBundleDaily[];
}

const num = (value: unknown, fallback = 0): number =>
  isFiniteNumber(value) ? value : fallback;

export function normalizeWeatherBundle(raw: unknown): WeatherBundle {
  const root = assertRecord(raw, "root");
  const current = assertRecord(root.current, "current");

  if (!isFiniteNumber(current.temperature_2m)) {
    throw new ValidationError("current.temperature_2m is missing");
  }

  const hourlyObj = isRecord(root.hourly) ? root.hourly : {};
  const hTimes = isStringArray(hourlyObj.time) ? hourlyObj.time : [];
  const hTemps = isFiniteNumberArray(hourlyObj.temperature_2m) ? hourlyObj.temperature_2m : [];
  const hPops = isFiniteNumberArray(hourlyObj.precipitation_probability)
    ? hourlyObj.precipitation_probability
    : [];
  const hCodes = isFiniteNumberArray(hourlyObj.weather_code) ? hourlyObj.weather_code : [];
  const hVis = isFiniteNumberArray(hourlyObj.visibility) ? hourlyObj.visibility : [];
  const hUv = isFiniteNumberArray(hourlyObj.uv_index) ? hourlyObj.uv_index : [];

  const currentTime = isString(current.time) ? current.time : "";
  let idx = hTimes.findIndex((t) => t >= currentTime);
  if (idx < 0) idx = 0;

  const currentBlock: WeatherBundleCurrent = {
    time: currentTime,
    temperature: num(current.temperature_2m),
    apparentTemperature: num(current.apparent_temperature, num(current.temperature_2m)),
    humidity: num(current.relative_humidity_2m),
    windSpeed: num(current.wind_speed_10m),
    windDirection: num(current.wind_direction_10m),
    precipitation: num(current.precipitation),
    weatherCode: num(current.weather_code),
    cloudCover: num(current.cloud_cover),
    uvIndex: idx >= 0 && idx < hUv.length ? hUv[idx] : 0,
    visibility: idx >= 0 && idx < hVis.length ? hVis[idx] : 0,
    isDay: current.is_day === 1,
  };

  const hourly: WeatherBundleHourly[] = hTimes.map((time, i) => ({
    time,
    temperature: hTemps[i] ?? 0,
    precipitationProbability: hPops[i] ?? 0,
    weatherCode: hCodes[i] ?? 0,
  }));

  const dailyObj = isRecord(root.daily) ? root.daily : {};
  const dTimes = isStringArray(dailyObj.time) ? dailyObj.time : [];
  const dCodes = isFiniteNumberArray(dailyObj.weather_code) ? dailyObj.weather_code : [];
  const dMax = isFiniteNumberArray(dailyObj.temperature_2m_max) ? dailyObj.temperature_2m_max : [];
  const dMin = isFiniteNumberArray(dailyObj.temperature_2m_min) ? dailyObj.temperature_2m_min : [];
  const dSunrise = isStringArray(dailyObj.sunrise) ? dailyObj.sunrise : [];
  const dSunset = isStringArray(dailyObj.sunset) ? dailyObj.sunset : [];
  const dUv = isFiniteNumberArray(dailyObj.uv_index_max) ? dailyObj.uv_index_max : [];
  const dPop = isFiniteNumberArray(dailyObj.precipitation_probability_max)
    ? dailyObj.precipitation_probability_max
    : [];

  const daily: WeatherBundleDaily[] = dTimes.map((date, i) => ({
    date,
    weatherCode: dCodes[i] ?? 0,
    tempMax: dMax[i] ?? 0,
    tempMin: dMin[i] ?? 0,
    sunrise: dSunrise[i] ?? "",
    sunset: dSunset[i] ?? "",
    uvIndexMax: dUv[i] ?? 0,
    precipitationProbabilityMax: dPop[i] ?? 0,
  }));

  return { current: currentBlock, hourly, daily };
}

export const WEATHER_REFRESH_MS = 10 * 60 * 1000; // 10 minutes

export function getWeatherBundle(
  lat: number = DHAKA_COORDS.lat,
  lon: number = DHAKA_COORDS.lon,
  options: OpenMeteoOptions = {},
): Promise<ApiResponse<WeatherBundle>> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m",
    hourly: "temperature_2m,precipitation_probability,weather_code,visibility,uv_index",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max",
    timezone: "Asia/Dhaka",
    forecast_days: "7",
  });

  return request<WeatherBundle>({
    url: `${API_ENDPOINTS.openMeteo.weather}?${params.toString()}`,
    source: API_ENDPOINTS.openMeteo.source,
    validate: normalizeWeatherBundle,
    ttlMs: options.ttlMs ?? WEATHER_TTL,
    retries: options.retries,
    timeoutMs: options.timeoutMs,
    signal: options.signal,
  });
}

// ───────────────────────────────────────────────────────────────────────────
// Full air-quality bundle (current + hourly + derived 5-day outlook).
// Only real Open-Meteo/CAMS model fields are read; missing values stay `null`
// and are never fabricated. Daily AQI is derived from the real hourly forecast
// because the air-quality API exposes no native daily aggregate.
// ───────────────────────────────────────────────────────────────────────────

export interface AirQualitySubIndices {
  pm25: number | null;
  pm10: number | null;
  no2: number | null;
  so2: number | null;
  o3: number | null;
  co: number | null;
}

export interface AirQualityCurrent {
  time: string;
  europeanAqi: number | null;
  usAqi: number | null;
  pm25: number | null;
  pm10: number | null;
  carbonMonoxide: number | null;
  nitrogenDioxide: number | null;
  sulphurDioxide: number | null;
  ozone: number | null;
  subIndices: AirQualitySubIndices;
}

export interface AirQualityHour {
  time: string;
  europeanAqi: number | null;
  usAqi: number | null;
  pm25: number | null;
  pm10: number | null;
}

export interface AirQualityDay {
  date: string;
  usAqiMax: number | null;
  usAqiMean: number | null;
  europeanAqiMax: number | null;
  europeanAqiMean: number | null;
}

export interface AirQualityBundle {
  current: AirQualityCurrent;
  hourly: AirQualityHour[];
  /** Derived from the hourly forecast (no native daily air-quality endpoint). */
  daily: AirQualityDay[];
}

const numOrNull = (value: unknown): number | null => (isFiniteNumber(value) ? value : null);

function numArrayOrNull(obj: Record<string, unknown>, key: string): (number | null)[] {
  const raw = obj[key];
  if (!Array.isArray(raw)) return [];
  return raw.map((v) => (isFiniteNumber(v) ? v : null));
}

function maxOrNull(values: number[]): number | null {
  return values.length === 0 ? null : Math.max(...values);
}

function meanOrNull(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function deriveDailyAirQuality(hourly: AirQualityHour[]): AirQualityDay[] {
  const byDate = new Map<string, { us: number[]; eu: number[] }>();
  for (const h of hourly) {
    const date = h.time.slice(0, 10);
    if (!date) continue;
    const bucket = byDate.get(date) ?? { us: [], eu: [] };
    if (h.usAqi != null) bucket.us.push(h.usAqi);
    if (h.europeanAqi != null) bucket.eu.push(h.europeanAqi);
    byDate.set(date, bucket);
  }
  return [...byDate.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, b]) => ({
      date,
      usAqiMax: maxOrNull(b.us),
      usAqiMean: meanOrNull(b.us),
      europeanAqiMax: maxOrNull(b.eu),
      europeanAqiMean: meanOrNull(b.eu),
    }));
}

export function normalizeAirQualityBundle(raw: unknown): AirQualityBundle {
  const root = assertRecord(raw, "root");
  const current = assertRecord(root.current, "current");

  if (!isFiniteNumber(current.european_aqi) && !isFiniteNumber(current.us_aqi)) {
    throw new ValidationError("current air-quality index is missing");
  }

  const currentBlock: AirQualityCurrent = {
    time: isString(current.time) ? current.time : "",
    europeanAqi: numOrNull(current.european_aqi),
    usAqi: numOrNull(current.us_aqi),
    pm25: numOrNull(current.pm2_5),
    pm10: numOrNull(current.pm10),
    carbonMonoxide: numOrNull(current.carbon_monoxide),
    nitrogenDioxide: numOrNull(current.nitrogen_dioxide),
    sulphurDioxide: numOrNull(current.sulphur_dioxide),
    ozone: numOrNull(current.ozone),
    subIndices: {
      pm25: numOrNull(current.us_aqi_pm2_5),
      pm10: numOrNull(current.us_aqi_pm10),
      no2: numOrNull(current.us_aqi_nitrogen_dioxide),
      so2: numOrNull(current.us_aqi_sulphur_dioxide),
      o3: numOrNull(current.us_aqi_ozone),
      co: numOrNull(current.us_aqi_carbon_monoxide),
    },
  };

  const hourlyObj = isRecord(root.hourly) ? root.hourly : {};
  const hTimes = isStringArray(hourlyObj.time) ? hourlyObj.time : [];
  const hEu = numArrayOrNull(hourlyObj, "european_aqi");
  const hUs = numArrayOrNull(hourlyObj, "us_aqi");
  const hPm25 = numArrayOrNull(hourlyObj, "pm2_5");
  const hPm10 = numArrayOrNull(hourlyObj, "pm10");

  const hourly: AirQualityHour[] = hTimes.map((time, i) => ({
    time,
    europeanAqi: hEu[i] ?? null,
    usAqi: hUs[i] ?? null,
    pm25: hPm25[i] ?? null,
    pm10: hPm10[i] ?? null,
  }));

  return { current: currentBlock, hourly, daily: deriveDailyAirQuality(hourly) };
}

export const AIR_QUALITY_REFRESH_MS = 30 * 60 * 1000; // 30 minutes

export function getAirQualityBundle(
  lat: number = DHAKA_COORDS.lat,
  lon: number = DHAKA_COORDS.lon,
  options: OpenMeteoOptions = {},
): Promise<ApiResponse<AirQualityBundle>> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      "european_aqi,us_aqi,us_aqi_pm2_5,us_aqi_pm10,us_aqi_nitrogen_dioxide,us_aqi_ozone,us_aqi_sulphur_dioxide,us_aqi_carbon_monoxide,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone",
    hourly: "european_aqi,us_aqi,pm10,pm2_5",
    timezone: "Asia/Dhaka",
    forecast_days: "5",
  });

  return request<AirQualityBundle>({
    url: `${API_ENDPOINTS.openMeteo.airQuality}?${params.toString()}`,
    source: API_ENDPOINTS.openMeteo.source,
    validate: normalizeAirQualityBundle,
    ttlMs: options.ttlMs ?? AIR_QUALITY_TTL,
    retries: options.retries,
    timeoutMs: options.timeoutMs,
    signal: options.signal,
  });
}