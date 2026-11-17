import { useAsyncData } from "./useAsyncData";
import { fetchNews } from "@/services/api";
import { newsList } from "@/data/news";

export function useNews() {
  return useAsyncData(fetchNews, newsList, []);
}