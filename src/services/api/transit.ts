import type { TransportAlert, BusRoute } from "@/types";
import { transportAlertsList, busRoutesStatus } from "@/data/transit";
import { mockRequest } from "./client";

export function fetchTransitAlerts(): Promise<TransportAlert[]> {
  return mockRequest(transportAlertsList);
}

export function fetchBusRoutes(): Promise<BusRoute[]> {
  return mockRequest(busRoutesStatus);
}