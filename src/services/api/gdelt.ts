import type { ApiResponse } from "@/types/api";
import { API_ENDPOINTS } from "@/config/api";
import { request } from "./http";
import { assertRecord, isRecord, isString, ValidationError } from "./validators";

/** News articles are cached for 10 minutes; the feed is not a live ticker. */
export const NEWS_REFRESH_MS = 10 * 60 * 1000;

export interface NewsSearchArticle {
  /** Stable id: the canonical article URL. */
  id: string;
  title: string;
  url: string;
  domain: string;
  language: string;
  country: string;
  /** ISO timestamp of publication as reported by GDELT, or null. */
  publishedAt: string | null;
  image: string | null;
}

export interface NewsSearchBundle {
  articles: NewsSearchArticle[];
  query: string;
}

interface NewsRequestOptions {
  signal?: AbortSignal;
  ttlMs?: number;
}

/** Parses GDELT's compact "YYYYMMDDTHHMMSSZ" timestamp. */
function parseSeenDate(value: unknown): string | null {
  if (!isString(value) || !value.trim()) return null;
  const match = /^(\d{4})(\d{2})(\d{2})T?(\d{2})(\d{2})(\d{2})Z?$/.exec(value.trim());
  if (!match) {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
  }
  const [, y, mo, d, h, mi, s] = match;
  const date = new Date(
    Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s)),
  );
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}

function optionalString(value: unknown): string {
  return isString(value) ? value.trim() : "";
}

/**
 * Validates and normalizes the GDELT artlist payload. Entries without a title
 * or URL are dropped; duplicates are removed. Throws ValidationError when the
 * response is not a recognisable GDELT article list.
 */
export function normalizeGdeltNews(raw: unknown, query: string): NewsSearchBundle {
  const root = assertRecord(raw, "root");
  const list = root.articles;
  if (!Array.isArray(list)) {
    throw new ValidationError('Expected an "articles" array from GDELT');
  }

  const seen = new Set<string>();
  const articles: NewsSearchArticle[] = [];

  for (const entry of list) {
    if (!isRecord(entry)) continue;
    const url = optionalString(entry.url) || optionalString(entry.url_mobile);
    const title = optionalString(entry.title);
    if (!url || !title || seen.has(url)) continue;
    seen.add(url);

    articles.push({
      id: url,
      title,
      url,
      domain: optionalString(entry.domain),
      language: optionalString(entry.language),
      country: optionalString(entry.sourcecountry),
      publishedAt: parseSeenDate(entry.seendate),
      image: optionalString(entry.socialimage) || null,
    });
  }

  return { articles, query };
}

/**
 * Searches recent news through the public GDELT DOC 2.0 API.
 *
 * GDELT is rate-limited and does not send permissive CORS headers for every
 * origin, so this resolves with an `ApiResponse` envelope: on failure `data` is
 * null and `error` is set. No fallback data is fabricated here — callers show
 * a separate, clearly labelled demo list.
 */
export async function getNewsSearch(
  query: string,
  options: NewsRequestOptions = {},
): Promise<ApiResponse<NewsSearchBundle>> {
  const trimmed = query.trim();
  const params = new URLSearchParams({
    query: trimmed,
    mode: "artlist",
    format: "json",
    maxrecords: "30",
    sort: "datedesc",
    timespan: "7d",
  });

  return request({
    url: `${API_ENDPOINTS.gdelt.doc}?${params.toString()}`,
    source: API_ENDPOINTS.gdelt.source,
    validate: (raw) => normalizeGdeltNews(raw, trimmed),
    ttlMs: options.ttlMs ?? NEWS_REFRESH_MS,
    retries: 0,
    signal: options.signal,
  });
}