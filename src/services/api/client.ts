import { APP_CONFIG } from "@/config";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export interface MockRequestOptions {
  latency?: number;
  failRate?: number;
}

/**
 * Simulated network request. Frontend-only: resolves with the provided data
 * after a small latency. Swap the body for a real `fetch` when a backend exists.
 */
export function mockRequest<T>(
  data: T,
  { latency = APP_CONFIG.apiLatencyMs, failRate = 0 }: MockRequestOptions = {},
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (failRate > 0 && Math.random() < failRate) {
        reject(new ApiError("Simulated network failure"));
        return;
      }
      resolve(data);
    }, latency);
  });
}