interface InFlightEntry {
  promise: Promise<unknown>;
}

const inFlight = new Map<string, InFlightEntry>();

/**
 * Request de-duplication: concurrent identical requests share a single
 * in-flight promise. The promise is removed once it settles.
 */
export function dedupe<T>(key: string, factory: () => Promise<T>): Promise<T> {
  const existing = inFlight.get(key);
  if (existing) return existing.promise as Promise<T>;

  const promise = factory().finally(() => {
    inFlight.delete(key);
  });

  inFlight.set(key, { promise });
  return promise;
}

export function getInFlightCount(): number {
  return inFlight.size;
}