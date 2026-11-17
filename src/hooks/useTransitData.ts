import { useAsyncData } from "./useAsyncData";
import { fetchTransitAlerts, fetchBusRoutes } from "@/services/api";
import { transportAlertsList, busRoutesStatus } from "@/data/transit";

/** Transit alerts + bus-route status (seeded, refreshed via the service layer). */
export function useTransitData() {
  const alerts = useAsyncData(fetchTransitAlerts, transportAlertsList, []);
  const busRoutes = useAsyncData(fetchBusRoutes, busRoutesStatus, []);
  return { alerts, busRoutes };
}