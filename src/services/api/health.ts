import type { ApiHealthSnapshot, ApiHealthStatus } from "@/types/api";

interface HealthRecord {
  name: string;
  consecutiveFailures: number;
  lastSuccessAt: string | null;
  lastErrorAt: string | null;
  lastError: string | null;
}

const records = new Map<string, HealthRecord>();

function getRecord(name: string): HealthRecord {
  let record = records.get(name);
  if (!record) {
    record = {
      name,
      consecutiveFailures: 0,
      lastSuccessAt: null,
      lastErrorAt: null,
      lastError: null,
    };
    records.set(name, record);
  }
  return record;
}

export function recordSuccess(name: string): void {
  const record = getRecord(name);
  record.consecutiveFailures = 0;
  record.lastSuccessAt = new Date().toISOString();
  record.lastError = null;
}

export function recordFailure(name: string, message: string): void {
  const record = getRecord(name);
  record.consecutiveFailures += 1;
  record.lastErrorAt = new Date().toISOString();
  record.lastError = message;
}

function toStatus(record: HealthRecord | undefined): ApiHealthStatus {
  if (!record || (record.lastSuccessAt === null && record.lastErrorAt === null)) {
    return "unknown";
  }
  if (record.consecutiveFailures === 0) return "healthy";
  // A couple of failures is "degraded"; sustained failures are "down".
  return record.consecutiveFailures >= 3 ? "down" : "degraded";
}

export function getHealthSnapshot(name?: string): ApiHealthSnapshot | ApiHealthSnapshot[] {
  const build = (record: HealthRecord): ApiHealthSnapshot => ({
    name: record.name,
    status: toStatus(record),
    lastSuccessAt: record.lastSuccessAt,
    lastErrorAt: record.lastErrorAt,
    lastError: record.lastError,
    consecutiveFailures: record.consecutiveFailures,
  });

  if (name) {
    return build(getRecord(name));
  }
  return Array.from(records.values()).map(build);
}

export function resetHealth(): void {
  records.clear();
}