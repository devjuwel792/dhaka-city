import type { NewsArticle } from "@/types";
import { newsList } from "@/data/news";
import { mockRequest } from "./client";

export function fetchNews(): Promise<NewsArticle[]> {
  return mockRequest(newsList);
}

export function fetchNewsById(id: number): Promise<NewsArticle | null> {
  return mockRequest(newsList.find((n) => n.id === id) ?? null);
}