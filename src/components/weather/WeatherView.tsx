"use client";

import { TodayWeatherCard } from "./TodayWeatherCard";
import { ForecastCard } from "./ForecastCard";
import { HourlyForecast } from "./HourlyForecast";
import { WeatherDetails } from "./WeatherDetails";
import { SunCycleCard } from "./SunCycleCard";
import { WaterloggingRiskCard } from "./WaterloggingRiskCard";
import { WeatherMeta } from "./WeatherMeta";
import { AirQualityCard } from "@/components/air-quality/AirQualityCard";
import { PollutantBreakdown } from "@/components/air-quality/PollutantBreakdown";
import { AqiTrendChart } from "@/components/air-quality/AqiTrendChart";
import { AirQualityForecast } from "@/components/air-quality/AirQualityForecast";
import { AirQualityMeta } from "@/components/air-quality/AirQualityMeta";

export function WeatherView() {
  return (
    <div className="space-y-6">
      <WeatherMeta />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <TodayWeatherCard variant="weather" className="md:col-span-5" />
            <ForecastCard className="md:col-span-7" />
          </div>

          <HourlyForecast />

          <WeatherDetails />

          <AqiTrendChart />
          <AirQualityForecast />
        </div>

        <div className="xl:col-span-4 space-y-8">
          <SunCycleCard />
          <WaterloggingRiskCard />
          <AirQualityCard />
          <AirQualityMeta />
          <PollutantBreakdown />
        </div>
      </div>
    </div>
  );
}