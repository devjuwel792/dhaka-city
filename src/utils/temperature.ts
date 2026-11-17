import type { TempUnit } from "@/types";

export function toFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

/** e.g. 23° C / 73° F */
export function formatTemp(celsius: number, unit: TempUnit): string {
  return unit === "F" ? `${toFahrenheit(celsius)}° F` : `${celsius}° C`;
}

/** e.g. 23° Celsius / 73° Fahrenheit */
export function formatTempFull(celsius: number, unit: TempUnit): string {
  return unit === "F" ? `${toFahrenheit(celsius)}° Fahrenheit` : `${celsius}° Celsius`;
}

/** e.g. 23° / 73° */
export function formatTempNum(celsius: number, unit: TempUnit): string {
  return unit === "F" ? `${toFahrenheit(celsius)}°` : `${celsius}°`;
}