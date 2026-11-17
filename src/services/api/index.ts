// Mock/demo service layer (seeded local data).
export * from "./client";
export * from "./weather";
export * from "./transit";
export * from "./news";
export * from "./cameras";

// Centralized API integration foundation (real fetch-based).
export { request } from "./http";
export { getCached, setCached, clearCache } from "./cache";
export { withRetry, defaultRetryOptions } from "./retry";
export { dedupe, getInFlightCount } from "./dedup";
export {
  recordSuccess,
  recordFailure,
  getHealthSnapshot,
  resetHealth,
} from "./health";
export {
  ValidationError,
  assertRecord,
  isFiniteNumber,
  isString,
  isFiniteNumberArray,
  isStringArray,
  isRecord,
} from "./validators";
export {
  getWeather,
  getAirQuality,
  validateWeather,
  validateAirQuality,
  type OpenMeteoWeather,
  type OpenMeteoAirQuality,
  type OpenMeteoOptions,
} from "./openMeteo";