import * as ENV from "env/env";

export function getImageUrl(folderName: string, path: string): string {
  return ENV.API_BASE_URL + "/image/" + folderName + "/" + path;
}

export function copyRecord<K extends keyof any, V>(record: Record<K, V>): Record<K, V> {
  return record ? { ...record } : ({} as Record<K, V>);
}
