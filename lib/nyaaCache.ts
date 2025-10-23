type NyaaResult = {
  totalPage: number;
  page: number;
  torrents: any[];
};

const cache = new Map<string, { ts: number; value: NyaaResult }>();
const TTL = 1000 * 60 * 5; // 5 minutes TTL

export function getCachedNyaa(q: string): NyaaResult | null {
  const entry = cache.get(q);
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL) {
    cache.delete(q);
    return null;
  }
  return entry.value;
}

export function setCachedNyaa(q: string, value: NyaaResult) {
  cache.set(q, { ts: Date.now(), value });
}
