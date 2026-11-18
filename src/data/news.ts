import type { NewsArticle } from "@/types";
import demoData from "./demo-data.json";

/** Static demo articles from `demo-data.json`. Always labeled DEMO in the UI. */
export const newsList: NewsArticle[] = demoData.news.articles as NewsArticle[];

export interface NewsTopic {
  id: string;
  label: string;
  labelBn: string;
  query: string;
}

/** GDELT search topics for Dhaka-focused news. */
export const NEWS_TOPICS: NewsTopic[] = demoData.news.topics as NewsTopic[];

export const DEFAULT_NEWS_TOPIC = NEWS_TOPICS[0];
